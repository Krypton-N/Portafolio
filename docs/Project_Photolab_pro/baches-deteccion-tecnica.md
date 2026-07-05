# Documentación técnica — Detección de baches con PhotoLab Pro MCP
**Proyecto:** PDI_MCP_PHOTOLAB  
**Imagen procesada:** Baches1.png  
**Fecha de sesión:** 2026-07-05

---

## 1. Petición original

> *"Carga la imagen Baches1.png. Es la foto de una calle dañada. Tu objetivo: detectar los BACHES del pavimento y señalarlos individualmente usando componentes conexas. Requisitos del resultado: Cada bache debe quedar identificado como una componente separada, con su etiqueta visible sobre la imagen. Solo baches: no cuentes vehículos, charcos de la banqueta ni otras zonas que no sean daño del pavimento. Dime cuántos baches encontraste y el área de cada uno, del más grande al más chico. Trabaja de forma iterativa: aplica, observa el resultado, y si estás detectando cosas que no son baches (o te faltan baches evidentes), ajusta tu estrategia y explica qué cambiaste y por qué. Al final guarda la imagen con los baches señalados en baches-detectados1"*

---

## 2. Imagen de origen

- **Nombre de archivo:** `Baches1.png`
- **Ruta completa:** `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\Baches1.png`
- **Dimensiones:** 700 × 454 px
- **Canales:** 3 (BGR)
- **dtype:** uint8
- **bits/px:** 24
- **Tamaño en memoria:** 953 400 bytes

*(Confirmados por `analizar` con `obtener_informacion_basica` al inicio de la sesión.)*

---

## 3. Traza completa de llamadas MCP, en orden

### Llamadas a `mcp__photolab__*`

---

**Llamada 1 — `cargar_imagen`**
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\Baches1.png" }
```
Respuesta: `"Imagen cargada: 700x454px · 3 canal(es) · uint8"`

---

**Llamada 2 — `analizar`**
```json
{ "operacion": "m12_analisis_metricas.obtener_informacion_basica" }
```
Respuesta:
```json
{
  "resolucion": "700 × 454 px",
  "canales": "3 (BGR)",
  "dtype": "uint8",
  "bits_per_pixel": "24 bits/px",
  "memory_size": 953400
}
```

---

**Llamada 3 — `aplicar_operacion` ← FALLIDA**
```json
{ "operacion": "m02_grises_color.convertir_grises", "params": {} }
```
Respuesta: `Error: "Operación desconocida: 'm02_grises_color.convertir_grises'. Usa listar_operaciones para ver las disponibles."`

*Razón del fallo: id asumido sin consultar el catálogo primero. Esto activó la exploración del catálogo.*

---

**Llamada 4 — `listar_operaciones`**
```json
{ "categoria": "m02", "detalle": true }
```
Respuesta: catálogo completo del módulo m02, incluyendo `m02_conversiones_canales.rgb_a_grises` con opciones `["ponderado", "promedio", "luminosidad"]`.

---

**Llamada 5 — `aplicar_operacion`**
```json
{ "operacion": "m02_conversiones_canales.rgb_a_grises", "params": { "metodo": "ponderado" } }
```
Respuesta: `700x454px · 1ch · 1 operación(es) en el pipeline` + imagen en escala de grises.

---

**Llamadas 6 y 7 — `listar_operaciones` (paralelas)**
```json
{ "categoria": "m01", "detalle": true }
{ "categoria": "m04", "detalle": false }
```
Respuestas: catálogo m01 (CLAHE, gamma, curvas, contraste) y catálogo m04 (filtros de suavizado, ids confirmados).

---

**Llamadas 8 y 9 — `listar_operaciones` (paralelas)**
```json
{ "categoria": "m08", "detalle": true }
{ "categoria": "m09", "detalle": true }
```
Respuestas: catálogo morfología (erosión, dilatación, apertura, cierre, top-hat, black-hat…) y catálogo componentes conexas (etiquetado_4, etiquetado_8, filtrado_por_area, visualizacion_coloreada, tabla_propiedades, seleccion_interactiva).

---

**Llamada 10 — `aplicar_operacion`**
```json
{ "operacion": "m01_histograma_tono.aplicar_clahe", "params": { "clip_limit": 3.0, "tile_size": 8 } }
```
Respuesta: `700x454px · 1ch · 2 operación(es) en el pipeline` + imagen CLAHE-enhanced.

---

**Llamada 11 — `aplicar_operacion`**
```json
{ "operacion": "m04_suavizado.filtro_gaussiano", "params": { "sigma": 2 } }
```
Respuesta: `700x454px · 1ch · 3 operación(es) en el pipeline` + imagen suavizada.

---

**Llamada 12 — `analizar`**
```json
{ "operacion": "m02_conversiones_canales.obtener_umbral_otsu" }
```
Respuesta: `125.0`

---

**Llamada 13 — `aplicar_operacion`**
```json
{ "operacion": "m02_conversiones_canales.umbral_otsu", "params": {} }
```
Respuesta: `700x454px · 1ch · 4 operación(es) en el pipeline` + imagen binaria (umbral=125, pixels >125 = blanco).

---

**Llamada 14 — `aplicar_operacion`**
```json
{ "operacion": "m08_morfologia.apertura", "params": { "forma": "disco", "radio": 4 } }
```
Respuesta: `700x454px · 1ch · 5 operación(es) en el pipeline` + imagen con ruido puntual eliminado.

---

**Llamada 15 — `aplicar_operacion`**
```json
{ "operacion": "m08_morfologia.cierre", "params": { "forma": "disco", "radio": 12 } }
```
Respuesta: `700x454px · 1ch · 6 operación(es) en el pipeline` + imagen con cierre excesivo (regiones fusionadas).

*← **Problema identificado:** radio 12 fusionó bus + banqueta + potholes en un blob gigante.*

---

**Llamada 16 — `analizar`**
```json
{ "operacion": "analisis.componentes_conexas", "params": { "min_area": 500 } }
```
Respuesta:
```json
{
  "num_componentes": 5,
  "componentes": [
    { "label": 1, "area": 99059, "bbox": [0, 0, 550, 425], "centroide": [248.1, 152.3] },
    { "label": 9, "area": 11992, "bbox": [527, 364, 173, 90], "centroide": [622.2, 413.9] },
    { "label": 6, "area": 11269, "bbox": [358, 233, 243, 84], "centroide": [481.0, 278.0] },
    { "label": 7, "area": 1362,  "bbox": [194, 282, 33, 112], "centroide": [208.4, 338.0] },
    { "label": 2, "area": 1029,  "bbox": [570, 47, 109, 25],  "centroide": [622.9, 59.5]  }
  ]
}
```
*Label 1 con área 99 059 px y bbox casi igual a toda la imagen = pipeline inútil en esta iteración.*

---

**Llamada 17 — `resetear`**
```json
{}
```
Respuesta: `"Pipeline reseteado a la imagen original."`

---

**Llamada 18 — `aplicar_pipeline`** (segunda iteración, umbral manual)
```json
{
  "pasos": [
    { "operacion": "m02_conversiones_canales.rgb_a_grises", "params": { "metodo": "ponderado" } },
    { "operacion": "m01_histograma_tono.aplicar_clahe",     "params": { "clip_limit": 3, "tile_size": 8 } },
    { "operacion": "m04_suavizado.filtro_gaussiano",        "params": { "sigma": 2 } },
    { "operacion": "m02_conversiones_canales.umbral_manual","params": { "umbral": 148 } }
  ]
}
```
Respuesta: `700x454px · 1ch · 4 operación(es) en el pipeline` + imagen binaria más limpia.

---

**Llamada 19 — `aplicar_operacion`**
```json
{ "operacion": "m08_morfologia.apertura", "params": { "forma": "disco", "radio": 3 } }
```
Respuesta: `700x454px · 1ch · 5 operación(es) en el pipeline`.

---

**Llamada 20 — `aplicar_operacion`**
```json
{ "operacion": "m08_morfologia.cierre", "params": { "forma": "disco", "radio": 6 } }
```
Respuesta: `700x454px · 1ch · 6 operación(es) en el pipeline`.

---

**Llamada 21 — `analizar`**
```json
{ "operacion": "analisis.componentes_conexas", "params": { "min_area": 300 } }
```
Respuesta: 13 componentes. Relevantes:
```json
[
  { "label": 2,  "area": 25504, "centroide": [384.5, 63.3]  },
  { "label": 12, "area": 13624, "centroide": [106.1, 241.4] },
  { "label": 1,  "area": 10660, "centroide": [74.5, 68.0]   },
  { "label": 15, "area": 10559, "centroide": [479.7, 278.1] },
  { "label": 23, "area": 8987,  "centroide": [622.9, 405.6] },
  { "label": 10, "area": 4999,  "centroide": [308.8, 175.2] },
  { "label": 17, "area": 1246,  "centroide": [287.7, 304.1] }
]
```
*Problema: label 2 (fondo carretera lejana, y≈63), label 12 (banqueta izquierda, x=0..307), label 1 (bus, y≈68). Filtrar por área sola no separaba baches de vehículos/banqueta porque sus áreas se solapaban.*

---

**Llamada 22 — `listar_operaciones`**
```json
{ "categoria": "m10", "detalle": true }
```
Respuesta: catálogo m10 incluyendo `m10_transformaciones_geometricas.recorte` con params `x, y, w, h, redimensionar_orig`.

*Consultado para evaluar si usar crop. Decisión final: abandonar el pipeline PhotoLab y usar Python/OpenCV via bash por control más preciso sobre la máscara espacial.*

---

**Llamada 23 — `resetear`**
```json
{}
```
Respuesta: `"Pipeline reseteado a la imagen original."`

---

*A partir de aquí, el procesamiento real se ejecutó vía `mcp__workspace__bash`. Las llamadas siguientes a PhotoLab son solo para **visualizar** resultados generados externamente.*

---

**Llamada 24 — `cargar_imagen`** (imagen intermedia para visualización)
```json
{ "ruta": "C:\\Users\\anoer\\AppData\\Roaming\\Claude\\local-agent-mode-sessions\\...\\outputs\\baches_iter1.png" }
```
Respuesta: `"Imagen cargada: 700x454px · 3 canal(es) · uint8"`

---

**Llamada 25 — `obtener_resultado`**
```json
{}
```
Respuesta: imagen con overlays de 6 componentes (labels 3, 5, 7, 9, 10, 14) sobre original, para inspección visual.

---

**Llamada 26 — `cargar_imagen`** (resultado final)
```json
{ "ruta": "C:\\Users\\anoer\\Pictures\\Saved Pictures\\PDI_MCP_PHOTOLAB\\baches-detectados1.png" }
```
Respuesta: `"Imagen cargada: 700x454px · 3 canal(es) · uint8"`

---

**Llamada 27 — `obtener_resultado`**
```json
{}
```
Respuesta: imagen final con 5 baches etiquetados, bounding boxes y leyenda.

---

### Llamadas a `mcp__workspace__bash`

**bash_1 — Exploración sin imagen de salida**
```python
# Parámetros: threshold=148, open=(7,7) ellipse, close=(13,13) ellipse
# Máscara: mask[130:, 140:] = 255
# Resultado impreso: 15 componentes antes de filtrar
# Labels relevantes (área > 1000):
#   3:  5291px  c=(308,174)
#   5:  4053px  c=(212,230)
#   7: 10543px  c=(480,278)
#   9:  1353px  c=(289,305)
#  14:  9241px  c=(624,406)
```

**bash_2 — Visualización intermedia (`baches_iter1.png`)**
```python
# Mismo pipeline que bash_1 (close 13x13)
# Filtra componentes >= 500px, dibuja overlay + bbox + etiqueta "#N A=XXXX"
# Guardado en: .../outputs/baches_iter1.png
# Componentes mostradas: [3, 5, 7, 9, 10, 14]
```

**bash_3 — Prueba closing más grande**
```python
# Cambia kernel_close a (19,19) ellipse
# Resultado: 5 componentes con área > 1000:
#   Label 3:  5793px  c=(307,174)
#   Label 5:  4389px  c=(212,230)
#   Label 7: 10565px  c=(479,278)
#   Label 9:  1422px  c=(290,306)
#   Label 13: 9390px  c=(624,407)
```

**bash_4 — Pipeline final + imagen de salida**
```python
# Pipeline completo con close=(19,19), filtra area >= 1000
# Ordena por área descendente → renumera Bache 1..5
# Dibuja: overlay semitransparente (alpha=0.50) + contornos + bbox + etiqueta + leyenda
# Guardado en: C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\baches-detectados1.png
```

---

## 4. Proceso de iteración y decisiones

**Iteración 1 — Umbral Otsu (125) + cierre disco r=12:**
Otsu en 125 capturaba demasiado: el bus, el fondo de carretera lejano y los reflejos de la banqueta quedaban como blancos junto con el agua en los baches. El cierre r=12 fundió todo en un blob único de 99 059 px. Sin información recuperable. → `resetear`.

**Iteración 2 — Umbral manual (148) + cierre disco r=6:**
Subir el umbral a 148 redujo los falsos positivos capturando solo el agua más brillante. El cierre r=6 conservó blobs separados. Pero los 13 componentes incluían: el bus (label 1, y≈68), la banqueta izquierda (label 12, x=0..307) y el fondo lejano (label 2, y≈63). El filtrado por área no era suficiente porque el bus (10 660 px) tenía área similar a los baches reales (8 987–10 559 px). → Necesitaba un filtro espacial.

**Decisión de cambiar a Python/bash:**
`m10_transformaciones_geometricas.recorte` existía pero solo cortaría la imagen de forma irreversible y en una sola dimensión. Usar Python/OpenCV directamente permitió aplicar una máscara booleana (`mask[130:, 140:] = 255`) que excluye simultáneamente vehículos (y < 130) y banqueta (x < 140) sin alterar la imagen original.

**Iteración 3 — Close (13×13) elipse en Python:**
Generó 6 componentes visibles. Los labels 9 y 10 (áreas 1353 y 720 px) eran fragmentos en la zona central dañada, visualmente ambiguos. Se generó `baches_iter1.png` para inspeccionarlos sobre la imagen original.

**Iteración 4 — Close (19×19) elipse:**
Con kernel más grande, label 10 (720 px) se absorbió en label 9, que creció a 1 422 px. Los 5 componentes resultantes tenían posiciones coherentes con los baches visibles. Label 9 (1 422 px, centroide y=306) estaba en zona de daño del pavimento, no en banqueta ni vehículos, y se conservó como bache pequeño. Se fijó `area_min = 1000`.

---

## 5. Pipeline final

El pipeline de procesamiento real corrió íntegramente en Python/OpenCV (bash), **no** en el pipeline interno de PhotoLab Pro. La cadena equivalente, en orden:

```
1. cv2.cvtColor(BGR → GRAY)
2. cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8)).apply()
3. cv2.GaussianBlur(ksize=(0,0), sigmaX=2)
4. cv2.threshold(thresh=148, maxval=255, type=THRESH_BINARY)
5. Máscara espacial: mask[y<130] = 0  AND  mask[x<140] = 0
6. cv2.morphologyEx(MORPH_OPEN,  kernel=ellipse(7,7))
7. cv2.morphologyEx(MORPH_CLOSE, kernel=ellipse(19,19))
8. cv2.connectedComponentsWithStats(connectivity=8)
9. Filtro: area >= 1000 px²
```

*(El pipeline de PhotoLab Pro quedó en `estado_pipeline` con 0 operaciones al final de la sesión, ya que el último `cargar_imagen` fue sobre el archivo de resultado generado externamente.)*

---

## 6. Resultado

**5 baches detectados**, ordenados por área descendente:

| Bache | Área (px²) | Centroide (x, y) | BBox (x, y, w, h)    |
|-------|-----------|-----------------|----------------------|
| 1     | 10 565    | (479, 278)      | (360, 234, 240, 82)  |
| 2     | 9 390     | (624, 407)      | (541, 366, 159, 88)  |
| 3     | 5 793     | (307, 174)      | (224, 144, 164, 66)  |
| 4     | 4 389     | (212, 230)      | (140, 195, 167, 74)  |
| 5     | 1 422     | (290, 306)      | (255, 285, 66, 51)   |

No se calcularon métricas de confianza ni PSNR/SSIM. Los valores de área son píxeles de la máscara binaria post-morfología, no de la imagen original.

**Archivo de salida único:** `baches-detectados1.png` (overlay sobre original, resolución completa 700×454).

---

## 7. Nombres de archivo de las imágenes

| Rol | Nombre exacto | Ruta en disco |
|-----|--------------|---------------|
| Imagen fuente | `Baches1.png` | `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\Baches1.png` |
| Intermedio (iteración 3, no entregado) | `baches_iter1.png` | `...\local_3e7c8764-...\outputs\baches_iter1.png` *(carpeta de outputs temporales de sesión, **no** en workspace)* |
| Resultado final | `baches-detectados1.png` | `C:\Users\anoer\Pictures\Saved Pictures\PDI_MCP_PHOTOLAB\baches-detectados1.png` |

> **Nota:** `baches_iter1.png` no está en el workspace — quedó en la carpeta de salidas temporales de la sesión. Solo `baches-detectados1.png` está en la carpeta persistente y disponible para conversión a .webp.
