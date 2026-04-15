# 1. Resumen del Proyecto
El proyecto consiste en una investigación cuantitativa enfocada en analizar y demostrar estadísticamente la relación existente entre el consumo de redes sociales con formato de videos cortos (como TikTok o Reels) y el deterioro en la atención, así como su impacto negativo en el rendimiento académico de estudiantes universitarios. Mediante la aplicación de técnicas de ciencia de datos, se extrajeron patrones de un conjunto de datos encuestado, logrando desarrollar un modelo de regresión que predice la pérdida atencional e identificando umbrales críticos de uso que validan los principios de la Teoría de la Carga Cognitiva.

# 2. Objetivo del Estudio
## Objetivo general
Analizar la relación entre el tiempo de exposición a videos cortos en redes sociales y los niveles de atención y retención de información en estudiantes universitarios, midiendo si esta exposición afecta significativamente su rendimiento.

## Objetivos específicos
- Determinar el tiempo promedio diario que los estudiantes invierten en redes sociales de contenido breve.
- Medir la correlación estadística entre las horas de consumo y los indicadores de comportamiento adictivo o falta de atención.
- Desarrollar un modelo predictivo matemático que asocie las horas de uso con la pérdida de capacidad cognitiva.
- Identificar si existe un umbral crítico temporal en el consumo de plataformas digitales tras el cual disminuye drásticamente el desempeño académico. 

# 3. Contexto del Problema
Con el avance de las tecnologías móviles, plataformas como TikTok han popularizado el consumo masivo de videos muy cortos y altamente estimulantes, apalancándose de algoritmos de recompensa inmediata ("scroll infinito"). Este fenómeno causa patrones de fragmentación atencional, colisionando directamente con la naturaleza del ámbito universitario superior, el cual exige capacidades de atención sostenida y retención profunda para absorber conocimientos técnicos complejos (lecturas, programación, matemáticas). En consecuencia, resolver y cuantificar esta brecha era necesario para poder proveer evidencia y proponer soluciones como estrategias de orientación o bienestar digital.

# 4. Descripción del Dataset
Los datos analizados provienen sustancialmente del proyecto, en especial del archivo `Students Social Media Addiction.csv`.
- **Fuente de los datos:** Proceso de encuestas o recopilación preexistente alojada en la carpeta del repositorio (`analisis/`).
- **Número aproximado de registros:** 705 estudiantes (registros válidos después de limpieza).
- **Variables principales:** 
  - `Avg_Daily_Usage_Hours` (Horas base del estudio).
  - `Addicted_Score` (Proxy numérico para pérdida de atención o dispersión).
  - `Affects_Academic_Performance` (Percepción dicotómica de afectación académica: Sí/No).
  - Otras variables complementarias: `Student_ID`, `Age`, `Gender`, `Country`, `Most_Used_Platform`, `Sleep_Hours_Per_Night`, `Mental_Health_Score`.
- **Tipos de variables:** Numéricas continuas (horas de uso temporal, horas de sueño), Numéricas discretas/escalares (scores de adicción y salud mental) y Categóricas (plataforma, género, impacto académico).
- **Periodo temporal:** No fue posible determinar una fecha o un periodo temporal específico de recolección a partir de los archivos, tratándose más de una recolección directa o "fotografía" transversal del caso.
- **Posibles problemas en los datos:** Presencia implícita de una fuerte dependencia del "autoreporte", lo cual suele ocasionar subestimación o sobrestimación del tiempo de pantalla reportado.

# 5. Construcción del Dataset
## Recolección de datos
Los datos fueron recolectados a partir de encuestas, lo que resulta en archivos de tipo CSV concentrados dentro del repositorio.

## Limpieza de datos
De acuerdo con la metodología documentada, el conjunto original atravesó un proceso de limpieza para excluir a los individuos que enviaron respuestas inconsistentes o incompletamente llenadas dentro del formulario, ajustando así la muestra al total de los 705 casos representativos, necesarios bajo el Teorema del Límite Central.

## Transformación de datos
Puesto que las variables centrales ya contaban con escala continua u original apropiada, la organización consistió en dividir los grupos poblacionales usando el campo `Affects_Academic_Performance` separando a usuarios que presentaban bajos rendimientos del resto del conjunto.

## Feature Engineering
Dentro de los scripts del proyecto no se constata la creación de características derivadas sintéticas adicionales. El equipo empleó los puntajes base del test y las horas reales directamente al modelo de machine learning de forma cruda.

# 6. Herramientas y Tecnologías Utilizadas
El proyecto presenta un alto grado de rigor analítico, haciendo uso de librerías en Python:
- **Lenguajes de programación:** Python.
- **Librerías de análisis de datos:** `pandas` (para manipulación tabular), `numpy` (cálculos numéricos), `scipy` y `statsmodels` (análisis estadístico inferencial y mínimos cuadrados).
- **Herramientas de visualización:** `matplotlib.pyplot` y `seaborn`.
- **Entornos de desarrollo:** Además del sistema de scripting base, la presencia de la carpeta `notebooks` (aunque vacía pero citada) y archivos `.ipynb` mencionables sugieren prototipado inicial o estructuración por celdas en plataformas tipo Jupyter.

# 7. Desarrollo del Análisis
## Análisis Exploratorio de Datos (EDA)
Inicialmente, se analizaron las medidas de tendencia central y dispersión para comprender la problemática base. Se calculó una media escandalosa de 4.92 horas/día (con variación de 1.26 horas), visualizada mediante histogramas con estimación de densidad (KDE). Paralelamente se exploraron correlaciones utilizando un mapa de calor para entender cómo factores como horas de sueño y la salud mental interactuaban con la adicción. En adición, el grupo comprobó qué plataformas concretas influenciaban en mayor nivel utilizando gráficos de cajas.

## Análisis estadístico o analítico
Se validaron los supuestos para poder usar métodos paramétricos (QQ-Plot, prueba de Shapiro-Wilk). Posteriormente, se empleó una **Prueba T de Student** para poblaciones independientes, segmentando a los encuestados que declararon presentar afectación académica y los que no. Con ella descubrieron diferencias probabilísticas que separan ambos grupos. También se determinó la fortaleza de esta relación a través del coeficiente de **Correlación de Pearson**.

## Modelado (si aplica)
Se hizo uso de un modelo de **Regresión Lineal Simple por Mínimos Cuadrados Ordinarios (OLS)**. La dependiente ($Y$) apuntó al nivel de afectividad/adicción cognitiva, predicha fuertemente por ($X$), las horas empleadas frente a videos. Se generaron las métricas de varianza de ajuste (se consiguió un alto coeficiente general del $R^2 = 0.692$) y de significancia general ($p-value$), logrando deducir la pendiente teórica de la afectación.

# 8. Desarrollo del Código
La arquitectura orientada al código se despliega preferentemente en el subdirectorio de trabajo `analisis/`. Su principal propósito es concentrar los scripts y la data a procesar.
* **`chainalisyst.py`:** Es el script analítico original del equipo; realiza carga en crudo de pandas desde fuente de formato CSV. Desarrolla el EDA básico, el motor de correlación, la invocación de `statsmodels` para construir la Regresión Lineal original, resolviendo y mostrando por consola las ecuaciones matemáticas de predicción, y por último una comparativa base con T-Student.
* **`chinaly.py`:** Script alterno altamente dedicado a refinación gráfica y visual. En lugar de imprimir consola, se encarga de empaquetar resultados y generar las cuatro imágenes clave del proyecto, aplicando formatos profesionales para el reporte académico (Histogramas ajustados, Violin plots del T-Student incorporando superposiciones densas al estilo pub-calidad y mapas de calor correlacionales).
* **`graphs3.py`:** Extensión secundaria que levanta reportes infográficos con información adicional sobre las correlaciones no tratadas inicialmente por el equipo, cruzando plataformas, horas de pérdida general vs. sueño perdido, abordando demográficas por género para descartar posibles sesgos.

# 9. Visualización de Resultados
En la **figura `grafica_1_histograma.png`** se muestra la curva representativa correspondiente a la distribución de horas a las que los encuestados se encontraban inmersos dentro de las plataformas a lo largo del tiempo, evidenciando el marcado sesgo cercano a las 4 y media horas por sobre la distribución natural.
En la **figura `grafica_2_regresion_pro.png`** se muestra un gráfico de distribución tipo 'jointplot' uniendo puntos dispersos atravesados por la recta algorítmica y confirmando el alza pronunciada de afectación.
En la **figura `grafica_3_t_student.png`** se muestra el grado de separación probabilística entre las dispersiones poblacionales de estudiantes sin daños académicos y los estudiantes con fuertes rezagos gracias a diagramas de violín.
En la **figura `grafica_4_heatmap.png`** se muestra un mapa calorífico que cruza todas las features de estudio revelando a primera vista los patrones y las correlaciones métricas en crudo.
En las adyacentes **figuras `grafica_extra_plataformas` y `grafica_extra_sueno`** se muestra visualmente y a nivel caja poblacional las aplicaciones de más alto riesgo y la penalización directa dentro de los regímenes del sueño universitario.

# 10. Resultados del Estudio
La evaluación probatoria arrojó que, de media, los encuestados universitarios desperdician casi $4.92$ horas diarias en este entorno. A través de la fuerza lineal de Pearson se confirmó una altísima relación ($\rho = 0.83$) entre la exposición y pérdida progresiva del foco atencional de estudio.
La revelación esencial es la existencia estadística de un "Umbral Crítico o de Tolerancia". Aquellos estudiantes por debajo de los niveles de $3.8$ - $4.0$ horas lograban asilar su desempeño; no obstante, todo consumo encima de dicha franja produce impactos drásticos y un quiebre probabilístico hacia la adicción irreversible. Se encontró que cada ciclo temporal añadido escala perjudicialmente con factor $\approx$ 1.05 al déficit cognitivo.

# 11. Conclusiones
La investigación rechaza totalmente hipótesis nulas, concluyendo que matemáticamente el consumo irrestricto de videos de formato de *scroll automático* inhibe los procesos de asimilación de estudio a largo plazo, confirmando mediante datos los postulados de la *Teoría de la Carga Cognitiva* en el contexto digital de la década actual.

# 12. Limitaciones del Estudio
Las principales fallas o barreras del modelo estadístico radican fuertemente en su dependencia del auto-reporte en encuestas lo cual podría representar información imprecisa del tiempo. Al poseer recolecciones con diseño no-experimental de orden "transversal" se pueden evaluar relaciones y asociaciones en los datos de forma robusta, más no lograr causalidades cronológicas perfectas a lo largo de un ciclo largo en la evolución del estudiante.

# 13. Trabajo Futuro
A base de los predictores recolectados y considerando el marco técnico de los responsables, se planea y sugiere formalizar estrategias como "Detox RRSS". Este consistirá en rutinas de micro-pausas y aplicaciones algorítmicas de "fricción cognitiva", una medida donde las integraciones añadan forzosamente barreras u obstáculos intencionales para abrir o manipular la red social desde el móvil forzando al estudiante a reevaluar su foco atencional continuamente.
