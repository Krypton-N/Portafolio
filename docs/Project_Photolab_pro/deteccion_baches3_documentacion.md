# Documentación técnica — Detección de baches en Baches3.jpg
**Proyecto:** PhotoLab Pro · Detección de daño vial con componentes conexas  
**Fecha de sesión:** 2026-07-05  
**Redactado por:** Claude (reconstrucción fiel de lo ocurrido en la sesión)

---

## 1. Petición original

> "Carga la imagen Baches3 Es la foto de una calle dañada. Tu objetivo: detectar los BACHES del pavimento y señalarlos individualmente usando componentes conexas. Requisitos del resultado:
> * Cada bache debe quedar identificado como una componente separada, con su etiqueta visible sobre la imagen.
> * Solo baches: no cuentes vehículos, charcos de la banqueta ni otras zonas que no sean daño del pavimento.
> * Dime cuántos baches encontraste y el área de cada uno, del más grande al más chico. Trabaja de forma iterativa: aplica, observa el resultado, y si estás detectando cosas que no son baches (o te faltan baches evidentes), ajusta tu estrategia y explica qué cambiaste y por qué. Al final guarda la imagen con los baches señalados en baches-detectados3"

---

## 2. Imagen de origen

| Campo | Valor |
|---|---|
| Nombre de archivo | `Baches3.jpg` |
| Ruta completa | `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\Baches3.jpg` |
| Dimensiones | 1280 × 640 px |
| Canales | 3 (BGR) |
| Dtype | uint8 |

Consultado mediante la respuesta de `cargar_imagen`.

---

## 3. Traza completa de llamadas MCP (en orden real)

### 3.1 Carga inicial

**Tool:** `cargar_imagen`
```json
{
  "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\Baches3.jpg"
}
```
**Respuesta:** `"Imagen cargada: 1280x640px · 3 canal(es) · uint8"`

---

### 3.2 Consulta de catálogo de operaciones

**Tool:** `listar_operaciones` — módulo m02 (umbralado y conversiones)
```json
{ "categoria": "m02", "detalle": true }
```
**Respuesta:** Catálogo completo de operaciones de m02 incluyendo `rgb_a_grises`, `umbral_otsu`, `umbral_manual`, `umbral_adaptativo`, `negativo`, etc.

**Tool:** `listar_operaciones` — módulo m09 (componentes conexas)
```json
{ "categoria": "m09", "detalle": true }
```
**Respuesta:** `etiquetado_8`, `etiquetado_4`, `filtrado_por_area`, `visualizacion_coloreada`, `tabla_propiedades`, `seleccion_interactiva`.

**Tool:** `listar_operaciones` — módulo m08 (morfología)
```json
{ "categoria": "m08", "detalle": true }
```
**Respuesta:** `apertura`, `cierre`, `erosion`, `dilatacion`, `black_hat`, `top_hat`, `gradiente_morfologico`, etc.

**Tool:** `listar_operaciones` — módulo m05 (bordes)
```json
{ "categoria": "m05", "detalle": true }
```

**Tool:** `listar_operaciones` — módulo m10 (geometría)
```json
{ "categoria": "m10", "detalle": true }
```
**Respuesta:** Confirmó existencia de `recorte` (parámetros: x, y, w, h, redimensionar_orig).

---

### 3.3 Intento 1 — Grises + CLAHE + Gaussiano + Otsu

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m02_conversiones_canales.rgb_a_grises", "params": {} },
    { "operacion": "m01_histograma_tono.aplicar_clahe", "params": { "clip_limit": 3, "tile_size": 8 } },
    { "operacion": "m04_suavizado.filtro_gaussiano", "params": { "sigma": 2, "ksize": 7 } }
  ]
}
```
**Respuesta:** `"Pipeline aplicado: 3 operación(es)"` + imagen en escala de grises con buen contraste local.

**Tool:** `aplicar_operacion`
```json
{
  "operacion": "m02_conversiones_canales.umbral_otsu",
  "params": {}
}
```
**Respuesta:** Imagen binaria. Resultado: el umbral de Otsu dividió la imagen en zonas brillantes/oscuras, pero capturó personas, vehículos y sombras junto con los baches. **No viable como máscara final.**

---

### 3.4 Reset y Intento 2 — Black-hat

**Tool:** `resetear`
```json
{}
```
**Respuesta:** `"Pipeline reseteado a la imagen original."`

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m02_conversiones_canales.rgb_a_grises", "params": {} },
    { "operacion": "m04_suavizado.filtro_gaussiano", "params": { "sigma": 3, "ksize": 9 } },
    { "operacion": "m08_morfologia.black_hat", "params": { "forma": "disco", "radio": 40 } }
  ]
}
```
**Respuesta:** Imagen black-hat. Resultado: la transformada destacó bordes de personas (alta variación local) más que los baches. En esta imagen, el pavimento es oscuro y los baches son depresiones aún más oscuras — la lógica del black-hat no se aplica bien. **Descartado.**

---

### 3.5 Reset y Intento 3 — Umbral manual bajo + negativo

**Tool:** `resetear`

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m02_conversiones_canales.rgb_a_grises", "params": {} },
    { "operacion": "m04_suavizado.filtro_gaussiano", "params": { "sigma": 4, "ksize": 13 } },
    { "operacion": "m02_conversiones_canales.umbral_manual", "params": { "umbral": 85 } },
    { "operacion": "m02_conversiones_canales.negativo", "params": {} }
  ]
}
```
**Respuesta:** Imagen binaria invertida. Los dos baches del primer plano aparecieron como manchas blancas en la parte inferior. La zona superior (personas, edificios) también produjo regiones blancas grandes. **Parcialmente útil.**

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m08_morfologia.apertura", "params": { "forma": "disco", "radio": 5 } },
    { "operacion": "m08_morfologia.cierre", "params": { "forma": "disco", "radio": 8 } }
  ]
}
```
**Respuesta:** Las manchas de baches de la zona inferior **desaparecieron**. Diagnóstico: el orden morfológico estaba equivocado — apertura antes de cierre eliminó los baches porque sus píxeles eran difusos y no superaban el umbral del kernel. Además, la apertura con radio=5 destruyó estructuras delgadas.

**Tool:** `analizar`
```json
{
  "operacion": "analisis.componentes_conexas",
  "params": { "min_area": 1000 }
}
```
**Respuesta:**
```json
{
  "num_componentes": 8,
  "componentes": [
    { "label": 1, "area": 152922, "bbox": [0, 0, 833, 439], "centroide": [312.4, 153.3] },
    { "label": 5, "area": 7857,   "bbox": [1201, 41, 53, 223], "centroide": [1228.2, 151.5] },
    { "label": 3, "area": 5917,   "bbox": [848, 0, 208, 204],  "centroide": [962.0, 59.2] },
    { "label": 12, "area": 5221,  "bbox": [551, 442, 338, 37], "centroide": [729.3, 458.7] },
    { "label": 4, "area": 4127,   "bbox": [1113, 0, 69, 109],  "centroide": [1154.3, 53.8] },
    { "label": 14, "area": 3688,  "bbox": [139, 499, 207, 51], "centroide": [234.2, 518.2] },
    { "label": 7, "area": 1796,   "bbox": [1135, 147, 38, 85], "centroide": [1158.6, 191.7] },
    { "label": 6, "area": 1357,   "bbox": [926, 51, 48, 67],   "centroide": [941.5, 78.8] }
  ]
}
```
Observación clave: la label 1 (área=152,922) es la mega-componente que absorbe todo el fondo. Las labels 12 y 14 (cy > 440) son los únicos candidatos en la zona de pavimento.

---

### 3.6 Reset y Intento 4 — Umbral manual más bajo (55)

**Tool:** `resetear`

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m02_conversiones_canales.rgb_a_grises", "params": {} },
    { "operacion": "m04_suavizado.filtro_gaussiano", "params": { "sigma": 2, "ksize": 7 } },
    { "operacion": "m02_conversiones_canales.umbral_manual", "params": { "umbral": 55 } },
    { "operacion": "m02_conversiones_canales.negativo", "params": {} }
  ]
}
```
**Respuesta:** Imagen con zonas muy selectivamente oscuras capturadas (intensidad < 55). Los baches aparecieron más fragmentados.

**Tool:** `aplicar_pipeline`
```json
{
  "pasos": [
    { "operacion": "m08_morfologia.apertura", "params": { "forma": "disco", "radio": 5 } },
    { "operacion": "m08_morfologia.cierre", "params": { "forma": "disco", "radio": 8 } }
  ]
}
```
**Respuesta:** Resultado binario con componentes muy pequeñas, los baches seguían fragmentados o eliminados.

---

### 3.7 Llamadas de visualización de resultados intermedios (Python → MCP)

A partir del intento 5 en adelante, el procesamiento se realizó **fuera del pipeline MCP**, directamente en Python/OpenCV mediante el shell de trabajo. Los resultados intermedios se guardaron en disco y se cargaron en el viewer de PhotoLab para inspeccionarlos visualmente.

**Tool:** `cargar_imagen`
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\preview_baches3.jpg" }
```
**Respuesta:** `"Imagen cargada: 1280x640px · 3 canal(es) · uint8"`

**Tool:** `obtener_resultado`
```json
{}
```
**Respuesta:** Vista del overlay con 7 candidatos detectados (versión con umbral adaptativo bloque=101, C=15, sin filtros de posición). Se observaron falsos positivos: B5 (banqueta izquierda) y B6 (charco banqueta derecha).

**Tool:** `cargar_imagen`
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\preview_v2.jpg" }
```
**Tool:** `obtener_resultado` → Vista de 3 baches con ROI más preciso.

**Tool:** `cargar_imagen`
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\baches-detectados3.jpg" }
```
**Tool:** `obtener_resultado` → **Vista final confirmada.**

---

## 4. Razonamiento del proceso iterativo

### Por qué Otsu falló
El umbral de Otsu es global y maximiza la varianza inter-clase. En una escena urbana con personas, edificios y asfalto, el umbral óptimo de Otsu separa "brillante vs oscuro" de forma que captura demasiados elementos no-bache.

### Por qué black-hat falló
El black-hat (`cierre(f) − f`) resalta estructuras oscuras dentro de un fondo claro. En Baches3, el pavimento es uniformemente oscuro y los baches son depresiones aún más oscuras — no hay un "fondo claro" local que contraste. La transformada destacó bordes de personas y ventanas más que los hoyos.

### Por qué el orden morfológico importó
Aplicar **apertura antes de cierre** destruyó los baches porque:
- La apertura (erosión + dilatación) elimina regiones más pequeñas que el elemento estructurante.
- Los baches, aunque grandes en el mundo real, producían máscaras binarias difusas y fragmentadas tras el umbralado.
- El orden correcto es **cierre primero** (rellena el interior del hoyo) y luego **apertura** (elimina ruido pequeño).

### Por qué se migró a Python/OpenCV
Las herramientas MCP de PhotoLab Pro no permiten:
- Aplicar una máscara de ROI arbitraria (ej. "solo y > 310 y x > 15")
- Combinar dos máscaras binarias con OR (no existe operación de fusión sin segundo archivo)
- Filtrar componentes por posición del centroide (solo por área)
- Iterar con lógica condicional

Python/OpenCV con `cv2.connectedComponentsWithStats` permitió hacer todo esto con control total.

### Estrategia final que funcionó
Combinación de **dos canales de detección** unidos con OR:

**Canal A — umbral global bajo (68):**  
Captura los baches muy oscuros (depresiones profundas, zonas mojadas oscuras).  
`blurred → threshold(68, INV) → AND(road_roi) → close(22) → open(6)`

**Canal B — umbral adaptativo (bloque 101, C=15):**  
Captura daño superficial menos oscuro pero localmente contrastante.  
`blurred → adaptiveThreshold(101, C=15, INV) → AND(road_roi) → close(18) → open(7)`

**ROI de pavimento:**
```
road_roi[:310, :] = 0        # personas/edificios parte superior
road_roi[:480, :15] = 0      # muro/banqueta extremo izquierdo
road_roi[:420, 1100:] = 0    # charco banqueta derecha
```

**Validación del gap entre B2 y B3:**  
Se analizó el perfil de intensidad en `x=120, y=330..580` y se confirmó que la zona `y=380–500` tiene intensidad media ≈ 125-130 (pavimento normal), no un hoyo — por tanto B2 y B3 son baches separados.

---

## 5. Pipeline final

> ⚠️ El pipeline final no se ejecutó dentro del servidor MCP de PhotoLab Pro. Se ejecutó en Python/OpenCV. No existe un `estado_pipeline` correspondiente a estos pasos. Lo que sigue es la reconstrucción fiel del código Python equivalente.

```
Entrada: Baches3.jpg (BGR, 1280×640, uint8)
│
├─ Canal A
│   ├─ GaussianBlur(ksize=9, sigma=3)
│   ├─ threshold(68, THRESH_BINARY_INV)
│   ├─ AND con road_roi
│   ├─ morphologyEx CLOSE (elipse 22×22)
│   └─ morphologyEx OPEN  (elipse 6×6)
│
├─ Canal B
│   ├─ GaussianBlur(ksize=9, sigma=3)
│   ├─ adaptiveThreshold(GAUSSIAN_C, INV, blockSize=101, C=15)
│   ├─ AND con road_roi
│   ├─ morphologyEx CLOSE (elipse 18×18)
│   └─ morphologyEx OPEN  (elipse 7×7)
│
├─ combined = Canal_A OR Canal_B
├─ connectedComponentsWithStats(connectivity=8)
└─ Filtro: 2500 ≤ área ≤ 70000 px²
```

---

## 6. Resultado final

### Baches detectados: **3**

| Etiqueta | Área (px²) | Centroide (x, y) | Bbox (x, y, w×h) | Descripción |
|---|---|---|---|---|
| B1 | **10,829** | (763, 458) | (546, 426, 491×62) | Grieta/bache elongado central |
| B2 | **7,419** | (103, 362) | (21, 311, 190×113) | Bache oval izquierda media distancia |
| B3 | **5,931** | (272, 519) | (132, 500, 300×52) | Bache primer plano izquierda |

**Métricas via `analizar`:** Solo se usó `analisis.componentes_conexas` con `min_area=1000` en el paso intermedio (resultado de 8 componentes). No se calcularon PSNR, SSIM ni otras métricas cuantitativas.

**Elementos excluidos correctamente:**
- Personas y edificios (y < 310)
- Banqueta izquierda (x < 15)
- Charco de banqueta derecha (x > 1100, y < 420)
- Vehículos (zona superior)

---

## 7. Nombres de archivo de imágenes fuente y resultado

| Rol | Nombre de archivo | Ruta completa |
|---|---|---|
| **Fuente** | `Baches3.jpg` | `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\Baches3.jpg` |
| **Resultado final** | `baches-detectados3.jpg` | `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\baches-detectados3.jpg` |
| Intermedio (descartable) | `preview_baches3.jpg` | mismo directorio |
| Intermedio (descartable) | `preview_v2.jpg` | mismo directorio |

Para la ficha de portafolio, los archivos `.webp` correspondientes estarán en:
- `docs/Project_Photolab_pro/Capturas/Baches3.webp`
- `docs/Project_Photolab_pro/Capturas/baches-detectados3.webp`

---

## Notas adicionales

- **Baches1.png** (700×454px, 3ch): se cargó en la misma sesión pero la detección **no se completó**. Solo se realizó análisis exploratorio de intensidades via bash (estadísticas de la zona y>130: min=15, max=247, mean=102.9, median=93.0). Esta imagen tiene la característica opuesta a Baches3: los baches están llenos de agua y aparecen como zonas **brillantes** (reflejo del cielo), no oscuras. La documentación de Baches1 queda pendiente.

- Los archivos `preview_baches3.jpg` y `preview_v2.jpg` no pudieron eliminarse del directorio (operación no permitida en el contexto del shell de trabajo).

- No se usaron las herramientas `estado_pipeline`, `abrir_gui` ni `crear_imagen` en esta sesión.
