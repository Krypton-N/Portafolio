# Documento Técnico — PhotoLab Pro

> Generado a partir del análisis estático del código fuente real.  
> `[VERIFICAR]` = afirmación que no pude confirmar en el código y requiere revisión manual.

---

## 1. Resumen ejecutivo

PhotoLab Pro es una aplicación de escritorio para Procesamiento Digital de Imágenes (PDI) construida con PyQt6 + OpenCV + NumPy. Permite aplicar una cadena de operaciones no-destructiva sobre cualquier imagen (incluido DICOM) y expone el mismo motor de procesamiento a modelos de lenguaje como herramientas MCP.

---

## 2. Objetivo y problema que resuelve

**Contexto académico:** Proyecto de 4.º semestre del curso PDI en ESCOM. Cubre los 13 módulos del programa: histograma, conversiones, ruido, suavizado, detección de bordes, realce, Fourier, morfología, componentes conexas, transformaciones geométricas, segmentación, métricas y operaciones entre imágenes.

**Problema técnico central:** Permitir que el usuario encadene operaciones de PDI de forma no-destructiva, visualice el resultado en tiempo real, deshaga/rehaga operaciones arbitrarias y exporte el pipeline como un script Python reproducible, sin perder nunca la imagen original.

**Problema adicional:** Hacer que ese mismo motor sea consumible desde una IA (Claude) sin modificar la lógica de procesamiento.

---

## 3. Funcionalidades principales

| Funcionalidad | Detalles extraídos del código |
|---|---|
| Pipeline no-destructivo | `ImageState._historial` + `_cache_imagenes`; original nunca mutable |
| Undo / Redo / Reset | `deshacer()`, `rehacer()`, `resetear()` en `image_state.py` |
| Preview en tiempo real | `QTimer` debounce 60 ms en `_BaseProcesamientoWidget._solicitar_preview()` |
| Visor dual zoom/pan | `ZoomableImageWidget` con cache de pixmap escalado; sincronización bilateral |
| 13 módulos / ~100 operaciones | Módulos m01–m13, cada uno con `ops.py` + `widgets.py` |
| DICOM support | `_leer_dcm()` en `main_window.py`; Rescale Slope/Intercept + Window/Level |
| Export/Import pipeline | `exportar_script()` / `importar_script()` en `image_state.py`; formato `.py` + JSON embebido |
| Servidor MCP | `mcp_server/server.py`; 8 tools expuestas vía `FastMCP`; re-usa `ImageState` headless |
| UI dark theme custom | QSS embebida en `main.py`; tipografía Nunito (variable font descargada al primer arranque) |

---

## 4. Arquitectura y flujo de datos

### Diagrama de capas

```
┌──────────────────────────────────────────────────────────────────────┐
│  CAPA DE ENTRADA                                                       │
│  main.py → QApplication → SplashScreen → MainWindow                   │
└───────────────────────┬──────────────────────────────────────────────┘
                        │ crea
                        ▼
┌──────────────────────────────────────────────────────────────────────┐
│  ESTADO CENTRAL  —  ImageState (QObject)                              │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────────┐    │
│  │ _imagen_original│  │ _historial        │  │ _cache_imagenes   │    │
│  │ (inmutable)     │  │ [Operacion, ...]  │  │ [ndarray, ...]    │    │
│  └─────────────────┘  └──────────────────┘  └───────────────────┘    │
│        ↑                                                               │
│  cargar_imagen()   aplicar_operacion()   deshacer()/rehacer()          │
│                                                                        │
│  Señales Qt: imagen_cambiada │ historial_cambiado │ imagen_cargada     │
└──────────┬──────────────────────────────────────────────────────────┘
           │ emite señales                  │ consume state
           ▼                                ▼
┌──────────────────────┐      ┌────────────────────────────────────────┐
│  CAPA DE WIDGETS UI  │      │  CAPA DE MÓDULOS                        │
│  ImageViewer         │      │  m01…m13/ops.py  →  funciones puras     │
│  HistogramPanel      │      │  f(imagen, **params) → ndarray           │
│  OpsStack            │      │                                          │
│  ParamsPanel         │      │  m01…m13/widgets.py → QWidget factories  │
│  ToolDocPanel        │      │  HERRAMIENTAS = {name: lambda state: W}  │
└──────────────────────┘      └────────────────────────────────────────┘
                                                │ paralelo
                                                ▼
                              ┌─────────────────────────────────────────┐
                              │  SERVIDOR MCP (headless)                 │
                              │  server.py + session.py + catalog.py     │
                              │  Sesion → ImageState (sin GUI)           │
                              │  8 tools: listar_operaciones,            │
                              │  cargar_imagen, aplicar_operacion,       │
                              │  aplicar_pipeline, obtener_resultado,    │
                              │  analizar, estado_pipeline, resetear     │
                              └─────────────────────────────────────────┘
```

### Flujo de una operación (caso nominal)

```
Usuario mueve slider
  → widget._solicitar_preview()
  → QTimer debounce 60 ms
  → state.previsualizar(fn, params)
  → fn(imagen_procesada_actual, **params)  [no toca _historial]
  → state._imagen_preview = resultado
  → state.imagen_cambiada.emit()
  → image_viewer.actualizar_procesada()
  → ZoomableImageWidget.set_pixmap() → .update() → paintEvent()

Usuario pulsa "Aplicar"
  → state.aplicar_operacion(nombre, fn, params)
  → op = Operacion(nombre, fn, params)
  → _historial.append(op)
  → resultado = fn(_cache_imagenes[-1].copy(), **params)  [O(1)]
  → _cache_imagenes.append(resultado)
  → imagen_cambiada.emit() + historial_cambiado.emit()
```

---

## 5. Stack técnico (versiones reales de `requirements.txt`)

| Componente | Versión mínima | Rol |
|---|---|---|
| Python | 3.14.2 (instalación real del autor) | Lenguaje |
| PyQt6 | ≥ 6.6.0 | GUI desktop |
| opencv-python | ≥ 4.9.0 | Motor de procesamiento de imágenes |
| numpy | ≥ 1.26.0 | Álgebra vectorial + arrays |
| matplotlib | ≥ 3.8.0 | Histogramas + gráficas embebidas |
| scipy | ≥ 1.12.0 | [VERIFICAR uso exacto en módulos] |
| scikit-image | ≥ 0.22.0 | Operaciones avanzadas (SLIC, region_growing, SSIM) |
| qt-material | ≥ 2.14 | Importado pero overrideado con QSS propia |
| qtawesome | ≥ 1.3.0 | Iconos Phosphor/Font Awesome en toda la UI |
| pydicom | ≥ 2.4.0 | Lectura de archivos DICOM médicos |
| numba | ≥ 0.59.0 | JIT compilation de hotpaths |
| pyyaml | ≥ 6.0 | Lectura de `docs/herramientas.yaml` [VERIFICAR uso en runtime] |
| mcp | ≥ 1.27.0 | Protocolo MCP; `FastMCP` del paquete `mcp.server.fastmcp` |

---

## 6. Dependencias clave y razón de cada una

**PyQt6 (no PyQt5 ni PySide6)**  
Qt6 es la versión activa. Se eligió PyQt6 sobre PySide6 por preferencia de sintaxis (sin renaming de enums). La UI completa se define programáticamente (sin `.ui` files), lo que hace el código portable y versionable.

**OpenCV (no PIL/Pillow)**  
OpenCV es el estándar de facto en PDI académico y científico. Más rápido que Pillow para convoluciones y morfología; tiene Canny, Watershed, GrabCut, CLAHE nativas. El costo: convención BGR en vez de RGB, manejada en `ndarray_to_pixmap()` con un slice invertido `[:, :, ::-1]`.

**Numba (no Cython ni puro Python)**  
Se usa `@njit(cache=True)` en exactamente tres funciones de bucle puro que no tienen equivalente vectorizado eficiente: `_mediana_adaptativa_single_channel`, `_filtro_moda_single_channel`, `_nms_kernel`. Cache=True compila una vez y persiste en `__pycache__/*.nbc`. Primera ejecución: ~2 s de compilación. Subsiguientes: tiempo nativo.

**NumPy FFT (no `cv2.dft`)**  
El módulo 07 usa `np.fft.fft2` / `np.fft.fftshift` directamente en lugar de `cv2.dft`. Razón: API más limpia para operar en el dominio de la frecuencia con aritmética compleja directa; la salida se maneja como `np.complex128`, lo que simplifica la construcción de máscaras multiplicativas.

**FastMCP (mcp ≥ 1.27.0)**  
Framework que implementa el Model Context Protocol (stdio) con decoradores `@mcp.tool()`. Elegido sobre implementar el protocolo a mano porque abstrae el transporte y el schema JSON.

---

## 7. Técnicas, algoritmos y patrones de diseño empleados

### Algoritmos de PDI implementados (verificados en código)

**Módulo 01 — Histograma y Tono**  
`cv2.equalizeHist()`, CLAHE (`cv2.createCLAHE`), especificación de histograma (lookup table inversa), corrección gamma (LUT `I^(1/γ)`), curvas de tono (interpolación de spline cúbica).

**Módulo 02 — Conversiones**  
`cv2.cvtColor` (BGR↔Gray, BGR↔HSV, BGR↔LAB, BGR↔YCrCb), pseudocolor con colormaps OpenCV, umbral de Otsu (`cv2.THRESH_OTSU`), umbral adaptativo (media/gaussiano local), Niblack y Sauvola (σ local calculada con boxFilter vectorizado).

**Módulo 03 — Ruido**  
Ruido gaussiano (randn + add), sal y pimienta (máscara aleatoria), speckle (multiplicativo), Poisson (`np.random.poisson`), uniforme. Métricas: MSE, PSNR (`10·log₁₀(255²/MSE)`), SNR.

**Módulo 04 — Suavizado**  
Box filter, Gaussiano, Mediana, Mediana adaptativa (JIT), Bilateral, Moda (JIT), Armónico y Contraharmónico (vectorizados), Kuwahara (completamente vectorizado con 4 anchors paralelos), Non-Local Means (`cv2.fastNlMeansDenoising/Colored`).

**Módulo 05 — Detección de bordes**  
Sobel (Gx, Gy, magnitud, ángulo), Prewitt (convolución manual), Roberts (kernel cruzado 2×2), Scharr, Gradiente morfológico (dilatación−erosión), Laplaciano (4- y 8-vecinos, kernel custom), LoG (Gaussiano + Laplaciano), Zero-crossings (totalmente vectorizado), Canny, NMS aislado (JIT, `_nms_kernel`).

**Módulo 07 — Fourier**  
`np.fft.fft2` / `fftshift` por canal. Espectro de magnitud (escala log, colormap MAGMA), espectro de fase (colormap HSV). Filtros en frecuencia: paso bajo/alto ideal, Butterworth (`H = 1/(1+(D/D₀)^2n)`), Gaussiano, banda eliminada, banda pasante, notch (con simétrico conjugado). Perfil 1D con Matplotlib.

**Módulo 08 — Morfología**  
Erosión, dilatación, apertura, cierre, gradiente, top-hat, black-hat, hit-or-miss, elementos estructurantes (rect, disco, cruz, elipse, línea, custom). Morfología en grises.

**Módulo 09 — Componentes conexas**  
`cv2.connectedComponentsWithStats` (4- y 8-conectividad), visualización coloreada, tabla de propiedades (Matplotlib), filtrado por área, selección interactiva por clic.

**Módulo 10 — Transformaciones geométricas**  
Traslación, rotación, escalado, volteo, recorte (crop por ROI), transformación afín (3 puntos → `cv2.getAffineTransform`), perspectiva (4 puntos → `cv2.getPerspectiveTransform`), interpolación (nearest, bilinear, bicúbica, Lanczos).

**Módulo 11 — Segmentación**  
Watershed, K-means (`cv2.kmeans`), GrabCut (`cv2.grabCut`), segmentación por rango de color en HSV, region growing, SLIC superpíxeles (scikit-image).

**Módulo 12 — Análisis y métricas**  
Información básica (dimensiones, dtype, tamaño en KB), estadísticas globales (media, std, min, max por canal), perfil de intensidad (interactivo, modo "line"), mapa de calor (colormap), SSIM (scikit-image), imagen diferencia.

**Módulo 13 — Operaciones entre imágenes**  
Suma, resta, multiplicación, división (saturada), AND/OR/XOR/NOT bit a bit, blending (`cv2.addWeighted`), aplicación de máscara.

### Patrones de diseño

| Patrón | Dónde | Descripción |
|---|---|---|
| Observer (Qt signals) | `ImageState` → widgets | `imagen_cambiada`, `historial_cambiado`, `imagen_cargada`, `procesando_inicio/fin` |
| Command | `Operacion` | Encapsula función + parámetros + metadatos para historial/undo |
| Factory + Registry | `HERRAMIENTAS` por módulo | `dict[str, Callable[[ImageState], QWidget]]`; lookup O(1) sin imports innecesarios |
| Strategy | Funciones puras `ops.py` | Intercambiables; misma firma `f(img, **params) → img` |
| Template Method | `_BaseProcesamientoWidget` | `_build_controles()` y `_get_params()` abstractos; `_solicitar_preview()` y `_aplicar()` concretos |
| Debounce | `QTimer` single-shot 60 ms | Evita recalcular N veces por segundo al arrastrar slider |
| Incremental cache | `_cache_imagenes` | Lista paralela al historial; `aplicar_operacion` es O(1), `_recalcular_desde(i)` es O(N-i) |

---

## 8. Metodología de desarrollo

Desarrollo iterativo por fases, documentado en `docs/DEVLOG.md` y `docs/plans/`:

- **Fase 1** — Módulo 01 (histograma/tono): validación de la arquitectura completa (state + signals + preview + pipeline).
- **Fases 2–13** — Un módulo por sesión: implementar `ops.py` → `widgets.py` → registrar en `HERRAMIENTAS` → agregar nombres al árbol `MODULOS`.
- **MCP Fase 1** — 13 operaciones representativas (1 por módulo) via `PROTOTIPO` set en `catalog.py`, con introspección automática de firmas.
- **Fase 4** (Interacciones avanzadas) — Modos `click`, `roi`, `line` en `ZoomableImageWidget`; señales `image_clicked`, `roi_selected`, `line_selected`.

El desarrollo usó Claude Code como co-piloto, con el DEVLOG como contrato de contexto entre sesiones.

---

## 9. Decisiones técnicas clave y sus trade-offs

### 9.1 Pipeline con cache incremental vs. replay completo

**Elegido:** `_cache_imagenes` es una lista de ndarrays donde `cache[i]` = resultado después de aplicar la operación `i-1`. `aplicar_operacion` añade en O(1): `fn(cache[-1])`. `eliminar_operacion(i)` o `mover_operacion` sólo recalcula desde el punto de cambio: `_recalcular_desde(primer_cambio)`.

**Alternativa descartada:** Replay completo desde cero en cada mutación. Simple, pero O(N) siempre. Para N=10 operaciones pesadas (NLM, Watershed) sería inaceptable.

**Trade-off:** El cache duplica el consumo de memoria (cada ndarray ocupa `H×W×C bytes`). Una imagen 4K RGB ocuparía ~24 MB por paso; con 10 pasos: ~240 MB extra. Aceptable en contexto académico.

### 9.2 Funciones puras (sin estado) en `ops.py`

**Elegido:** Cada operación es `f(imagen, **params) → ndarray`. Sin efectos secundarios, sin acceso al estado global.

**Beneficio directo:** El mismo código lo usan la GUI (`ImageState`), el MCP headless (`Sesion`), y los scripts exportados (import directo). Tres consumidores con cero código duplicado.

**Costo:** Los widgets deben mantener el estado de los controles ellos mismos y pasar los parámetros en `_get_params()`.

### 9.3 Numba JIT sólo para hotpaths sin equivalente vectorizado

**Política explícita en el código:** Sólo se usa Numba cuando no existe una alternativa vectorizada eficiente. Kuwahara y Armónico/Contraharmónico están completamente vectorizados con `cv2.boxFilter`. Numba sólo aparece en mediana adaptativa, filtro de moda y NMS, donde el bucle por píxel es ineludible (cada píxel tiene condición de parada distinta).

**Costo:** Primera importación en la sesión compila el JIT (~2 s). Mitigado con `cache=True`.

### 9.4 NumPy FFT en vez de cv2.dft para el módulo Fourier

**Razón técnica:** `np.fft.fft2` devuelve `complex128` nativo de Python; operar con máscaras multiplicativas en el dominio frecuencial es aritmética de arrays directa. `cv2.dft` devuelve un array de 2 canales (real + imaginario) que requiere split/merge constante, lo que obscurece el código pedagógico.

**Trade-off:** `cv2.dft` puede ser ligeramente más rápido para imágenes muy grandes; no relevante en el contexto académico.

### 9.5 Servidor MCP reutilizando `ImageState` headless

**Razón:** `session.py` instancia `ImageState()` directamente, sin GUI. Toda la lógica de pipeline (cache, undo, serialización) está disponible sin modificación.

**Problema resuelto:** Matplotlib NO es thread-safe; `FastMCP` es async y puede llamar tools en paralelo. Solución: `ThreadPoolExecutor(max_workers=1)` — todas las ops van al mismo hilo dedicado donde pyplot siempre es el mismo contexto.

### 9.6 Introspección automática del catálogo MCP

`catalog.py::construir_catalogo()` usa `pkgutil.iter_modules` + `inspect.signature` para descubrir automáticamente todas las funciones públicas de cada `ops.py`. El catálogo no requiere registro manual. Parámetros especiales (`img_b`, `imagen_b`) se reconocen por nombre y se mapean a `ruta_imagen_b: str` para que el LLM pueda especificar rutas de archivo.

### 9.7 Exportación de pipeline como script Python ejecutable

`exportar_script()` genera un `.py` con: imports exactos de las funciones usadas, llamadas en orden, y un JSON serializado de la metadata al final como comentario (`# PIPELINE_DATA = {...}`). `importar_script()` lee ese JSON con `importlib.import_module` dinámico para reconstruir el pipeline. El JSON embebido como comentario evita dependencias externas (no YAML, no JSON aparte) y hace el script legible y ejecutable de forma independiente.

---

## 10. Retos enfrentados y cómo se resolvieron

### BGR vs RGB — conversión en el límite UI
OpenCV usa BGR; Qt usa RGB. El único lugar de conversión es `ndarray_to_pixmap()` en `image_viewer.py`:
```python
rgb = np.ascontiguousarray(imagen[:, :, ::-1])
```
Todos los módulos internos trabajan siempre en BGR. Éste es el único punto de transformación.

### Bucle infinito en sincronización de zoom/pan
`ZoomableImageWidget` tiene dos métodos de zoom: `set_zoom()` (emite señal) y `set_zoom_only()` (no emite señal). Sin esta distinción, sincronizar original↔procesada causaría: panel A emite → panel B actualiza → panel B emite → panel A actualiza → … infinito. La verificación `if abs(zoom_actual - zoom) > 1e-7` y los métodos `_only` cortan el ciclo.

### Matplotlib no thread-safe en el MCP async
Resuelta con `ThreadPoolExecutor(max_workers=1)`. Todas las operaciones (incluidas las que usan pyplot, como `perfil_1d_frecuencias`) van al mismo hilo. Se pre-calienta en `_calentar_matplotlib_en_hilo_op()` al arrancar, y el `MPLCONFIGDIR` se fija a una carpeta local para que el caché de fuentes no se reconstruya en cada arranque bajo el sandbox MSIX de Claude Desktop.

### DICOM: valores fuera de rango y múltiples fotointerpretaciones
`_leer_dcm()` aplica en orden: Rescale Slope/Intercept, luego Window/Level (sólo si el rango se solapa con los datos reales; de lo contrario min-max), luego inversión para MONOCHROME1. Maneja también multi-frame (CT con stack de frames) tomando `px[0]` si `px.ndim == 3 and px.shape[-1] not in (1, 3, 4)`.

### Debounce en preview de sliders
Sin debounce, mover un slider de 0 a 100 lanzaría ~100 llamadas a operaciones pesadas. El `QTimer` single-shot con 60 ms reinicia el contador en cada evento; la operación sólo se ejecuta cuando el usuario deja de mover el control durante 60 ms.

### Superposiciones interactivas (ROI, línea) a través del zoom
Las señales `roi_selected` y `line_selected` emiten coordenadas de **imagen real** (píxeles), no coordenadas de widget. `widget_to_image_coords()` convierte con `(pt - offset) / zoom` y clampea al tamaño real de la imagen. Esto garantiza que lo que ve el usuario corresponde exactamente a los parámetros recibidos por el módulo.

---

## 11. Estado actual y limitaciones conocidas

| Aspecto | Estado |
|---|---|
| Módulos m01–m13 | Implementados y funcionales |
| Interacciones avanzadas (click, ROI, línea) | Implementadas en widgets que las usan |
| MCP — Fase 1 (13 ops) | Completo; Fase 2 (~100 ops) pendiente (`solo_prototipo=False`) |
| Tests automatizados | No existen (no hay `tests/`, no hay pytest en requirements) |
| Linting / formato | No configurado (no hay `.flake8`, `pyproject.toml`, etc.) |
| Persistencia de preferencias | No implementada (zoom, layout, última carpeta) |
| Procesamiento en hilo background | No implementado; ops pesadas bloquean el hilo principal de Qt durante el procesamiento real (preview + apply) |
| DICOM multi-frame (CT color) | Maneja el primer frame; los subsiguientes frames se descartan |
| Tipografía Nunito | Se descarga al primer arranque desde GitHub; sin conexión usa fallback del sistema |

---

## 12. Posibles mejoras / siguiente iteración

1. **Procesamiento en QThread/ThreadPool** — Mover `aplicar_operacion()` a un hilo background para que la UI no se congele durante ops lentas (NLM, GrabCut). `procesando_inicio/fin` ya emite las señales necesarias para mostrar/ocultar el cursor de espera; solo falta mover la ejecución al hilo.

2. **MCP Fase 2** — Cambiar `solo_prototipo=False` en `Sesion.__init__` expone automáticamente ~100 operaciones. Sólo requiere revisar los tipos de parámetros de cada función para que la introspección los describa correctamente al LLM.

3. **Persistencia del pipeline** — `exportar_script()` ya serializa el historial como JSON embebido. Un formato nativo `.plp` (JSON) permitiría guardar/restaurar sesiones completas sin usar el script Python.

4. **Tests de regresión** — Las funciones puras en `ops.py` son perfectamente unitestables (`pytest` + `np.testing.assert_array_equal`). Sin GUI, sin estado.

5. **Reducción de memoria del cache** — Para imágenes grandes, comprimir los frames intermedios del cache con `cv2.imencode('.png', ...)` o usar un pool LRU que solo mantenga en RAM los últimos N frames.

---

## 13. Preguntas técnicas probables + respuestas ancladas en el código

---

**P: ¿Por qué `_imagen_original` nunca se modifica directamente?**  
R: Es la invariante central del diseño no-destructivo. En `cargar_imagen()`:
```python
self._imagen_original = imagen.copy()
```
Y en `resetear()`:
```python
self._imagen_procesada = self._imagen_original.copy()
```
Nunca hay `self._imagen_original[...] = ...` en ningún lugar del codebase. La operación más cercana sería llamar `cargar_imagen()` de nuevo, lo que explícitamente intenta ser una carga nueva.

---

**P: ¿Cómo se resuelve la recursión de señales en la sincronización de zoom?**  
R: Hay dos métodos: `set_zoom(zoom, center)` emite `zoom_changed`, y `set_zoom_only(zoom)` también emite pero protege con `if abs(self._zoom - zoom) < 1e-7: return`. El `ImageViewer` conecta cross:
- `panel_original.zoom_changed → _sync_zoom_orig_to_proc` → llama `widget_proc.set_zoom_only(zoom)`
- `panel_procesada.zoom_changed → _sync_zoom_proc_to_orig` → llama `widget_orig.set_zoom_only(zoom)`

`set_zoom_only` emite la señal sólo si el valor difiere; si no, sale sin emitir. La comprobación de tolerancia `1e-7` evita que errores de punto flotante causen un loop de "casi igual pero no exactamente".

---

**P: ¿Cuál es la complejidad de deshacer y de eliminar una operación intermedia?**  
- `deshacer()`: O(1) — pop del historial, pop del cache, devuelve `cache[-1]`.  
- `eliminar_operacion(i)`: O(N−i) — recalcula desde i hasta el final usando `_recalcular_desde(i)`.  
- `mover_operacion(src, dst)`: O(N − min(src,dst)) — recalcula desde el primer índice afectado.

---

**P: ¿Por qué el servidor MCP usa un `ThreadPoolExecutor` con `max_workers=1`?**  
R: Matplotlib no es thread-safe. `FastMCP` es async y podría llamar dos tools simultáneamente. Si dos operaciones que usan pyplot (p. ej. `perfil_1d_frecuencias` y `tabla_propiedades`) corrieran en hilos distintos, habrá corrupción de estado de la figura. Con `max_workers=1`, todas las ops quedan serialadas en el mismo hilo y pyplot siempre ve el mismo contexto. Ver `server.py:51-57`.

---

**P: ¿Cómo sabe el catálogo MCP qué parámetros acepta cada función sin registro manual?**  
R: `catalog.py::_inspeccionar()` llama `inspect.signature(fn)` y recorre `sig.parameters`. El parámetro 0 se omite (es la imagen primaria). Los `VAR_KEYWORD` (`**_`) se omiten. Los que están en `IMG_B_NAMES = {"img_b", "imagen_b"}` se reemplazan por `ruta_imagen_b: str`. Los demás se tipifican según el tipo del default (`isinstance(default, int)` → `"int"`, etc.).

---

**P: ¿Cómo se implementó el NMS (Non-Maximum Suppression) sin usar OpenCV?**  
R: `_nms_kernel()` en `m05_deteccion_bordes/ops.py` es una función JIT compilada con `@njit(cache=True)`. Para cada píxel calcula el ángulo del gradiente en grados, lo cuantiza a 0°/45°/90°/135°, identifica los dos vecinos en esa dirección, y sólo mantiene el valor si es mayor que ambos. La versión Canny de OpenCV también hace NMS internamente, pero `visualizacion_nms()` lo expone como operación independiente para propósitos pedagógicos.

---

**P: ¿Cómo se procesan correctamente los archivos DICOM?**  
R: `_leer_dcm()` aplica tres pasos en orden:
1. **Rescale Slope/Intercept** → convierte a unidades reales (Hounsfield Units en CT).
2. **Window Center/Width** → aplica la ventana clínica sólo si el rango [WC−WW/2, WC+WW/2] se solapa con los datos reales; si no, hace normalización min-max.
3. **PhotometricInterpretation** → invierte MONOCHROME1, convierte RGB→BGR.

El manejo explícito del solapamiento de ventana es importante: hay archivos DICOM donde `WindowCenter` es 0 y los datos van de −1000 a +3000 HU; sin verificar el solapamiento, la imagen saldría completamente negra.

---

**P: ¿Por qué el export del pipeline es un archivo `.py` y no JSON?**  
R: El archivo `.py` es directamente ejecutable sin ninguna dependencia de la aplicación, siempre que el paquete `photolab_pro` esté en el path. El JSON de metadata se embebe como comentario (`# PIPELINE_DATA = {...}`) para que `importar_script()` pueda leerlo sin parsear Python. Un archivo `.json` puro no sería ejecutable directamente; un archivo sólo Python no serializaría fácilmente los ndarray de imágenes secundarias (que se guardan como archivos `.png` adyacentes y se referencian en el JSON).

---

## Las 3 cosas más impresionantes desde el punto de vista de ingeniería

### 🥇 1. Cache incremental con recálculo parcial

La mayoría de aplicaciones similares de nivel académico hacen replay completo desde cero en cada cambio. PhotoLab Pro mantiene `_cache_imagenes[i]` = estado después de la op `i-1`, lo que hace que añadir una operación sea O(1) (solo procesa la última) y que eliminar o reordenar una operación recalcule sólo desde el punto de cambio. Esto es correcto y eficiente incluso para pipelines largos con operaciones costosas. **Ver `image_state.py:116-140` y `_recalcular_desde():243-261`.**

### 🥈 2. Servidor MCP que reutiliza el mismo `ImageState` sin modificarlo

El servidor MCP es una capa completamente separada que instancia `ImageState()` headless (sin GUI) y reutiliza las mismas funciones puras de `ops.py` que usa la interfaz gráfica. No hay código duplicado. La separación GUI / lógica es tan limpia que se puede usar el motor completo de PDI desde un LLM en modo CLI. El manejo del thread-safety de Matplotlib con `ThreadPoolExecutor(max_workers=1)` demuestra comprensión de los límites del framework. **Ver `server.py`, `session.py`, `catalog.py`.**

### 🥉 3. Contrato de función pura como interfaz de extensibilidad

La firma `f(imagen: np.ndarray, **params) -> np.ndarray` es el único contrato que un módulo debe cumplir para integrarse con el pipeline, el undo/redo, el preview, el export de scripts y el servidor MCP. Añadir una operación nueva requiere escribir esa función y registrarla en `HERRAMIENTAS`. Este diseño de "boundary explícito" entre lógica de procesamiento y lógica de aplicación es lo que permite que el proyecto tenga 13 módulos y ~100 operaciones sin que la complejidad escale con ellos.
