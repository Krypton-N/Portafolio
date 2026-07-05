# PhotoLab Pro — Documentación del servidor MCP

> Material para documentar cómo funciona el servidor MCP `photolab` (PhotoLab Pro).
> Todos los ejemplos de la sección 1 son **reales**: se ejecutaron en esta sesión
> sobre `carta-inlgesa-10-corazones.jpg` (220×177 px, 3 canales, uint8).

---

## 0. Arquitectura en una frase

PhotoLab Pro expone **9 tools MCP** (no ~100). Las ~108 operaciones de PDI **no son
tools individuales**: viven en un catálogo interno y se invocan por `id`
(formato `mXX_modulo.funcion`) a través de las tools `aplicar_operacion`,
`aplicar_pipeline` y `analizar`. El pipeline es **no destructivo**: la imagen
original nunca se modifica; cada operación se re-aplica en orden desde la original
y el resultado se guarda en caché incremental.

Las 9 tools reales del servidor:

| Tool | Rol |
|------|-----|
| `cargar_imagen` | Carga imagen de trabajo (resetea pipeline) |
| `crear_imagen` | Genera imagen sintética (degradado, círculo, ajedrez, ruido) |
| `listar_operaciones` | Introspección del catálogo (ids, params, defaults, enums) |
| `aplicar_operacion` | Aplica **una** operación → devuelve imagen |
| `aplicar_pipeline` | Aplica una cadena de operaciones de golpe |
| `analizar` | Ejecuta operación de tipo `datos` → devuelve JSON (no toca pipeline) |
| `obtener_resultado` | Exporta la imagen procesada a disco (resolución completa) |
| `estado_pipeline` | Historial de operaciones aplicadas |
| `resetear` | Vacía el pipeline (vuelve a la original) |
| `abrir_gui` | Abre/re-sincroniza la ventana de PhotoLab (espejo en vivo) |

---

## 1. Ejemplo real de uso (máxima prioridad)

### 1.1 Petición del usuario (mensaje en el cliente MCP)

> *"carga la imagen de carta-inglesa-10-corazones en la GUI de photolab e
> identifícalos, segméntalos, y aplica el overlay para poder ver los corazones
> por separado"*

### 1.2 Traza de llamadas MCP (request → response reales)

**Paso 1 — Abrir GUI y cargar la imagen**

```jsonc
// tool: abrir_gui   (sin parámetros)
{}
// → {"result": "La GUI ya estaba abierta; sesión sincronizada."}

// tool: cargar_imagen
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI\\carta-inlgesa-10-corazones.jpg" }
// → {"result": "Imagen cargada: 220x177px · 3 canal(es) · uint8"}
```

**Paso 2 — Introspección antes de segmentar** (nunca se inventan ids)

```jsonc
// tool: listar_operaciones
{ "categoria": "m11", "detalle": true }
// → devuelve el schema de m11_segmentacion.segmentacion_color con sus params:
//   h_min/h_max/s_min/s_max/v_min/v_max (int), invertir (bool),
//   modo_resultado ∈ ["Máscara sobre original","Máscara binaria","Resaltado de región"]
```

**Paso 3 — Segmentar el rojo (corazones) en HSV**
El rojo cruza el 0 de Hue, por eso `h_min > h_max` (wrap-around soportado):

```jsonc
// tool: aplicar_operacion
{
  "operacion": "m11_segmentacion.segmentacion_color",
  "params": {
    "h_min": 170, "h_max": 10,
    "s_min": 70,  "s_max": 255,
    "v_min": 50,  "v_max": 255,
    "modo_resultado": "Máscara binaria"
  }
}
// → "Aplicado: m11_segmentacion.segmentacion_color · 220x177px · 3ch · 1 operación en el pipeline"
//   (máscara con los 10 corazones grandes + pips de esquina + símbolos de las letras)
```

**Paso 4 — Contar/medir sin renderizar (vía `analizar`)**

```jsonc
// tool: analizar
{ "operacion": "analisis.componentes_conexas", "params": { "min_area": 1 } }
// → JSON con 24 componentes. Los 10 corazones centrales tienen área 287–731 px;
//   el siguiente objeto (pip de esquina) cae a 117 px → hay un corte de área claro.
```

**Paso 5 — Filtrar por área para quedarse con los 10**

```jsonc
// tool: aplicar_operacion
{
  "operacion": "m09_componentes_conexas.filtrado_por_area",
  "params": { "area_min": 150, "area_max": 5000, "conectividad": 8 }
}
// → "2 operaciones en el pipeline" (quedan exactamente los 10 corazones)
```

Verificación:

```jsonc
// tool: analizar
{ "operacion": "analisis.componentes_conexas", "params": { "min_area": 50 } }
// → {"num_componentes": 10, ...}  ✔ conteo correcto
```

**Paso 6 — Overlay: colorear + numerar + bbox de cada corazón**

```jsonc
// tool: aplicar_operacion
{ "operacion": "m09_componentes_conexas.etiquetado_8" }   // sin params
// → "3 operaciones en el pipeline" · cada componente coloreada, numerada 1–10, bbox verde
```

**Paso 7 — Exportar a disco (resolución completa)**

```jsonc
// tool: obtener_resultado
{ "guardar_en": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI\\output\\carta-inlgesa-10-corazones_etiquetado_overlay.png" }
// → "Guardado en: ...\\output\\carta-inlgesa-10-corazones_etiquetado_overlay.png"
```

### 1.3 Resultado

Pipeline final de **3 pasos** (visibles en vivo en la GUI):
`segmentacion_color` → `filtrado_por_area` → `etiquetado_8`.
Salida: `output/carta-inlgesa-10-corazones_etiquetado_overlay.png` — 10 corazones
etiquetados 1–10, cada uno con color propio y bounding-box.

---

## 2. Firmas y docstrings de tools representativas

> Las firmas de tipos y los docstrings provienen del **schema MCP real** que el
> servidor publica (obtenido vía introspección en esta sesión). La reconstrucción
> `@mcp.tool()` refleja ese contrato; los cuerpos son ilustrativos.

### 2.1 `cargar_imagen`

```python
@mcp.tool()
def cargar_imagen(ruta: str) -> dict:
    """Carga una imagen desde una ruta de archivo como imagen de trabajo de la sesión.

    Resetea el pipeline. Acepta formatos que lea OpenCV (PNG, JPG, BMP, TIFF...).
    """
```
JSON de ejemplo válido según su schema:
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI\\RayosX.png" }
```

### 2.2 `aplicar_operacion`

```python
@mcp.tool()
def aplicar_operacion(operacion: str, params: dict | None = None) -> dict:
    """Aplica UNA operación al pipeline y devuelve la imagen resultante.

    'operacion' es el id del catálogo (ver listar_operaciones), p. ej.
    'm11_segmentacion.segmentacion_color'. 'params' es un objeto con los
    parámetros (los omitidos usan su default). Devuelve la imagen para que la veas.
    """
```
JSON de ejemplo válido según su schema:
```json
{
  "operacion": "m01_histograma_tono.aplicar_clahe",
  "params": { "clip_limit": 3.0 }
}
```

### 2.3 `analizar`

```python
@mcp.tool()
def analizar(operacion: str, params: dict | None = None) -> dict:
    """Ejecuta una operación de ANÁLISIS que devuelve datos (no imagen).

    Para operaciones con tipo_resultado='datos' (p. ej. 'analisis.componentes_conexas'
    o 'm12_analisis_metricas.calcular_estadisticas_globales'). Devuelve JSON.
    Para CONTAR objetos usa 'analisis.componentes_conexas' (rápido, sin render).
    """
```
JSON de ejemplo válido según su schema:
```json
{ "operacion": "analisis.componentes_conexas", "params": { "min_area": 50 } }
```

### 2.4 `listar_operaciones` (introspección — clave del diseño)

```python
@mcp.tool()
def listar_operaciones(categoria: str = "", detalle: bool = False) -> dict:
    """Lista las operaciones de procesamiento disponibles (~108 en 13 módulos).

    Sin 'detalle': índice compacto {id: descripción} ([datos] marca las de 'analizar').
    Con detalle=true: además los parámetros de cada op (default, tipo y, en los
    string tipo enum, la lista 'opciones' con los valores válidos).
    Filtra por 'categoria' (subcadena del id, p. ej. 'm11' o 'segmentacion').
    """
```

---

## 3. Tools MCP más representativas (para la card)

De las 9 tools, estas 4 cuentan la historia completa del servidor:

1. **`aplicar_operacion`** — el caballo de batalla: aplica cualquiera de las ~108
   operaciones del catálogo al pipeline no destructivo.
2. **`listar_operaciones`** — introspección obligatoria: el cliente descubre ids,
   tipos y enums en runtime en vez de hardcodearlos (evita inventar operaciones).
3. **`analizar`** — vía de datos: separa *medir* (JSON: conteo, áreas, métricas
   PSNR/SSIM) de *renderizar*, sin ensuciar el pipeline.
4. **`abrir_gui`** — el diferenciador visual: espejo en vivo, cada operación MCP
   se refleja en la ventana (visor, histograma, pila de operaciones).

---

## 4. Inventario de capturas / imágenes disponibles

**Hallazgo importante:** en el repo **no existen capturas de la ventana de la GUI**
(no hay archivos tipo `screenshot`/`gui`/`ventana`). Lo que sí existe son
**imágenes de resultado** de ejercicios previos (máscaras y overlays). Para las
portadas que requieren *la aplicación en pantalla* habrá que tomar la captura
manualmente con la GUI abierta.

### a) Portada de la card (ventana principal + panel de parámetros)
No disponible como archivo. **Acción:** capturar la pantalla con `abrir_gui`
activo mostrando una imagen cargada y el panel de parámetros visible. Buen
candidato de imagen para lucir: `RayosX.png` (445×524) o `baboon.png`.

### b) Antes / después encadenado (para slider de comparación)
Sí hay pares reales imagen-fuente → resultado ya generados en `output/`:

| Antes (fuente, raíz PDI) | Después (resultado, output/) | Operaciones encadenadas |
|--------------------------|------------------------------|--------------------------|
| `carta-inlgesa-10-corazones.jpg` | `output/carta-inlgesa-10-corazones_etiquetado_overlay.png` | segmentación color → filtrado por área → etiquetado_8 |
| `arbol_california.jpg` | `output/arbol_california_plaga_overlay.png` (+ `_mascara.png`, `_etiquetado.png`) | segmentación color → morfología → componentes conexas |
| `nopal.jpg` | `output/nopal_cochinilla_overlay.png` (+ `_etiquetado.png`) | segmentación → etiquetado + overlay |
| `bache_carros.jpg` | `output/bache_carros_overlay.png` (+ `_mascara.png`) | segmentación → overlay de detección |

**Mejor par para el slider:** `carta-inlgesa-10-corazones.jpg` ↔
`carta-inlgesa-10-corazones_etiquetado_overlay.png` — misma imagen, salto visual
claro (foto plana → 10 objetos coloreados y numerados) y es el ejercicio
documentado arriba.

### c) Vista DICOM (soporte médico)
No disponible. **No hay archivos `.dcm` ni DICOM** en el repo. La única imagen de
tipo médico es `RayosX.png` (radiografía convencional, no DICOM). Si el soporte
DICOM es distintivo del producto, hay que añadir un `.dcm` de muestra y capturar
su carga; con el material actual no se puede ilustrar.

---

## 5. Convenciones del entorno (referencia)

- **Origen:** `C:\Users\anoer\Pictures\Saved Pictures\PDI\` — nunca se sobrescriben originales.
- **Salida:** subcarpeta `output\` estrictamente.
- **Nomenclatura:** nombre original + sufijo de la operación principal
  (p. ej. `carta-inlgesa-10-corazones_etiquetado_overlay.png`).
- **Color interno:** el motor trabaja en **BGR** nativo de OpenCV (tenerlo en
  cuenta al fijar umbrales/rangos).
