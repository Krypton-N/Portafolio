import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Activity, Target, AlertTriangle, Layers, Code, CheckCircle2, ChevronDown, ChevronUp, Database, TrendingUp, BarChart3, Clock, FileText, Download, Eye } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Gráficas e imágenes locales
import imgHistograma from './Project4/grafica_1_histograma.png';
import imgRegresion from './Project4/grafica_2_regresion_pro.png';
import imgTStudent from './Project4/grafica_3_t_student.png';
import imgHeatmap from './Project4/grafica_4_heatmap.png';
import imgPlataformas from './Project4/grafica_extra_plataformas.png';
import imgSueno from './Project4/grafica_extra_sueno.png';
import imgResultados from './Project4/inves.png';

// Documentos PDF
import docInforme from './Project4/Informe_Investigacion_RFAN_Ate_Frag.pdf';
import docPresentacion from './Project4/Investigacion_Atencion fragmentada_presentacion.pdf';

const Project4 = () => {
    // Tomamos el proyecto correspondiente en base de datos (id: 4 - Análisis de Atención en Estudiantes)
    const project = projectsData.find(p => p.id === 4) || {
        title: "Análisis de Atención en Estudiantes",
        tags: ["Data Science", "Python", "Stats"],
        links: { github: "#", demo: "#" }
    };

    const [expandedRetos, setExpandedRetos] = useState({});

    const toggleReto = (idx) => {
        setExpandedRetos(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const techStack = [
        { name: 'Python', role: 'Lenguaje principal' },
        { name: 'Pandas', role: 'Manipulación tabular' },
        { name: 'NumPy', role: 'Cálculos numéricos' },
        { name: 'SciPy & Statsmodels', role: 'Análisis estadístico inferencial' },
        { name: 'Matplotlib', role: 'Gráficos base' },
        { name: 'Seaborn', role: 'Visualizaciones estadísticas' },
    ];

    const consideraciones = [
        {
            icon: <Database size={18} />,
            title: 'Limpieza y Filtrado de Datos',
            description: 'Trabajar con encuestas autoguiadas implica el riesgo de recibir datos sucios o inconsistentes que afectarían los resultados estadísticos finales.',
            solution: 'Se aplicó un riguroso proceso de limpieza excluyendo a individuos con respuestas incompletas, ajustando la muestra a 705 casos válidos representativos, necesarios bajo el Teorema del Límite Central.',
        },
        {
            icon: <Activity size={18} />,
            title: 'Saturación en el Auto-reporte',
            description: 'Las variables de tiempo reportado suelen sufrir subestimación o sobrestimación por parte de los encuestados, lo que genera ruido en el modelo.',
            solution: 'El análisis confió en las tendencias macro de distribución. Al segmentar la base usando la variable de "Afectación al Rendimiento", el sesgo individual se diluía en favor del patrón general.',
        },
        {
            icon: <Target size={18} />,
            title: 'Generación de Gráficos Publicables',
            description: 'Construir diagramas que transmitan claramente la correlación no es sencillo usando los parámetros predeterminados de Matplotlib.',
            solution: 'Se empleó el script dedicado `chinaly.py` para empaquetar visualizaciones con estilo pub-quality, utilizando diagramas de violín (KDE densos) e histogramas estilizados.',
        },
        {
            icon: <TrendingUp size={18} />,
            title: 'Regresión Lineal Robusta',
            description: 'Probar que el consumo de redes sociales predecía la pérdida atencional requería un modelo lineal que minimizará el error residual de manera correcta.',
            solution: 'Se aplicó un modelo Mínimos Cuadrados Ordinarios (OLS) obteniendo un R² = 0.692 altamente significativo, hallando la recta de la afectación real a través de los datos dispersos.',
        }
    ];

    const scriptsCode = [
        { tipo: 'ETL y Base', script: "chainalisyst.py", proposito: 'Carga cruda CSV, EDA básico y construcción de Regresión Lineal original junto a T-Student.' },
        { tipo: 'Visualización', script: "chinaly.py", proposito: 'Refinación gráfica visual. Empaqueta resultados y genera imágenes de calidad académica (Histogramas, heatmap, violines).' },
        { tipo: 'Extensión Analítica', script: "graphs3.py", proposito: 'Reportes infográficos cruzando plataformas, tiempo en apps vs sueño perdido y variables demográficas.' },
    ];

    return (
        <>
            <div className="fixed inset-0 bg-zinc-950/80 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }} />

            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-8 transition-colors group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                            <Badge key={idx}>{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {project.title}<span className="text-rose-500">.</span>
                    </h1>
                    <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl">
                        Investigación cuantitativa centrada en analizar la relación entre el consumo de videos cortos (TikTok/Reels) y el deterioro de la atención y rendimiento académico en estudiantes universitarios.
                    </p>

                    <div className="flex gap-4 mt-8">
                        {project.links?.github && project.links.github !== "#" && (
                            <Button href={project.links.github} variant="secondary">
                                <Github size={20} /> Ver Código
                            </Button>
                        )}
                        {project.links?.demo && project.links.demo !== "#" && (
                            <Button href={project.links.demo} variant="primary">
                                <ExternalLink size={20} /> Repo Dataset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left Content — 3 cols */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* 01. Sobre el Proyecto */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">01.</span> Sobre la Investigación
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-4">
                                <p>
                                    Este proyecto es un estudio de ciencia de datos que buscó encontrar el impacto real tras el uso continuo de redes sociales de videos cortos sobre las capacidades cognitivas necesarias en ámbitos universitarios rigurosos (como ingeniería, programación o matemáticas).
                                </p>
                                <p>
                                    Aplicando técnicas de limpieza de datos, análisis exploratorio y modelado inferencial (como Regresión Lineal OLS), el estudio logra extraer evidencia estadística sólida, calculando incluso el "umbral de tiempo crítico" a partir del cual el daño a la retención de información es irreversible.
                                </p>

                                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 mt-4">
                                    <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">Objetivos Clave:</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li>Determinar el tiempo promedio invertido diariamente en estas redes.</li>
                                        <li>Medir la correlación estadística frente a comportamientos de falta de atención.</li>
                                        <li>Desarrollar un modelo predictivo matemático de la pérdida de capacidad cognitiva.</li>
                                        <li>Fijar umbrales críticos de exposición.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 02. Contexto del Problema */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">02.</span> Contexto del Problema
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                <p>
                                    Actualmente, plataformas como TikTok apalancan su éxito en características como videos extremadamente breves y algoritmos de <strong className="text-zinc-200">recompensa inmediata</strong> a través del *scroll infinito*.
                                </p>
                                <p>
                                    El problema central es que esto induce a una <strong>fragmentación de la atención</strong> que choca violentamente contra la exigencia universitaria. De acuerdo con <strong className="text-zinc-200">James (1890)</strong>, la retención depende de la atención sostenida. Cuantificar esta brecha con modelos predictivos era primordial, validando cómo la sobrestimulación merma la "lectura profunda" (Carr, 2010).
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2"><Clock size={16} className="text-rose-400" /> Fragmentación del Tiempo</h4>
                                        <p className="text-xs text-zinc-500">Micro-interrupciones continuas rompen el estado de flujo (flow-state) impidiendo codificar la información de la memoria de corto a largo plazo.</p>
                                    </div>
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2"><AlertTriangle size={16} className="text-rose-400" /> Carga Cognitiva</h4>
                                        <p className="text-xs text-zinc-500">Los estímulos acelerados saturan la capacidad de procesamiento bajo la <em>Teoría de la Carga Cognitiva</em> (Sweller, 1988), inhibiendo procesos de asimilación.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 03. Metodología de Datos */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">03.</span> Metodología y Procesamiento
                            </h2>
                            <div className="space-y-6">
                                {/* Detalle del Dataset */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm">
                                    <p className="mb-4">El análisis se construyó en torno al archivo <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-200">Students Social Media Addiction.csv</code>, compuesto originalmente de recolecciones encuestadas a más de <strong className="text-zinc-200">705 estudiantes universitarios</strong>, suficientes para evocar el Teorema del Límite Central.</p>

                                    <div className="bg-zinc-950/60 rounded-xl p-4 border border-white/5 font-mono text-sm">
                                        <p className="text-rose-400 font-bold mb-3 font-sans text-xs uppercase tracking-wider">Variables Clave del Dataset</p>
                                        <div className="space-y-1 text-zinc-300">
                                            <p className="flex justify-between border-b border-white/5 py-1">
                                                <span className="text-emerald-400">Avg_Daily_Usage_Hours</span>
                                                <span className="text-zinc-500 text-xs">Eje X Principal</span>
                                            </p>
                                            <p className="flex justify-between border-b border-white/5 py-1">
                                                <span className="text-amber-400">Addicted_Score</span>
                                                <span className="text-zinc-500 text-xs">Eje Y (Pérdida Cognitiva)</span>
                                            </p>
                                            <p className="flex justify-between border-b border-white/5 py-1">
                                                <span className="text-blue-400">Affects_Academic_Performance</span>
                                                <span className="text-zinc-500 text-xs">Separador Binario</span>
                                            </p>
                                            <p className="flex justify-between py-1">
                                                <span className="text-zinc-400">Extra_Features</span>
                                                <span className="text-zinc-500 text-xs">Gender, Platform, Sleep_Score</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <BarChart3 size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">Análisis Exploratorio</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Estimaciones de densidad KDE para entender la campana poblacional. Descubrimos una media alarmante de 4.92 horas de uso al día. Se ejecutaron mapas de calor para detectar relaciones directas antes del modelado.
                                        </p>
                                    </div>
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <Layers size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">Pruebas Inferenciales</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Una vez validados los supuestos normativos vía Shapiro-Wilk, aplicamos la T de Student en poblaciones separadas corroborando la afectación real reportada vs los puntajes ciegos del test de adicción.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 04. Arquitectura del Código */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">04.</span> Arquitectura del Código
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-inner backdrop-blur-sm">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Rol</th>
                                            <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Archivo</th>
                                            <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Propósito / Función</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scriptsCode.map((eq, idx) => (
                                            <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="px-5 py-3 text-zinc-300 font-medium">{eq.tipo}</td>
                                                <td className="px-5 py-3 font-mono text-rose-300 text-xs">{eq.script}</td>
                                                <td className="px-5 py-3 text-zinc-500 text-xs">{eq.proposito}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* 05. Resultados Clave */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">05.</span> Hallazgos y Resultados Visuales
                            </h2>
                            <div className="space-y-6">
                                {/* Hallazgo 1 */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2">Correlación de Pearson y Modelo OLS</h3>
                                    <p className="mb-4">
                                        A través del coeficiente de Spearman/Pearson confirmamos una correlación positiva muy fuerte de <strong className="text-zinc-200 bg-rose-500/20 px-1 py-0.5 rounded border border-rose-500/30">r = 0.83</strong>. Esto implica que a mayor consumo de videos cortos, mayor deterioro en los indicadores de control atencional.
                                    </p>
                                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5 font-mono text-sm my-4">
                                        <span className="text-rose-400 font-bold block mb-2">Ecuación de Predicción (Mínimos Cuadrados):</span>
                                        <span className="text-white text-lg block">Y = 1.05X + 1.27</span>
                                        <p className="text-xs text-zinc-500 mt-2 font-sans">
                                            Donde <strong className="text-zinc-300">R² = 0.692</strong>. El 69.2% de la variación en los problemas de atención se explica <em>exclusivamente</em> por este tiempo de uso. Por cada hora extra, el puntaje de afectación sube <strong>1.05 puntos</strong>.
                                        </p>
                                    </div>

                                    <h3 className="text-lg font-bold text-rose-400 mt-6 mb-2">El Umbral Crítico (T-Student)</h3>
                                    <p className="text-sm border-l-2 border-rose-500/40 pl-4 mt-2">
                                        Al evaluar la afectación académica (Estadístico t = 23.38), hallamos una barrera drástica en torno a las <strong className="text-zinc-200">3.8 - 4.0 horas diarias</strong>. Por debajo de 3.8h, los estudiantes disocian el entretenimiento del rendimiento. Superar esa franja desencadena una probabilidad de daño cognitivo exponencial, superior al 95%.
                                    </p>

                                    {/* Gráfico Regresion */}
                                    <div className="mt-6 rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50">
                                        <div className="px-3 py-2 border-b border-white/5">
                                            <span className="text-xs font-mono text-zinc-500">Regresión OLS: Hours vs Addiction Score</span>
                                        </div>
                                        <img src={imgRegresion} alt="Regresión Linal sobre los datos" className="w-full h-auto p-2" loading="lazy" />
                                    </div>
                                </div>

                                {/* Hallazgo 2 */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2">Correlaciones Múltiples</h3>
                                    <p className="text-sm">
                                        Emplear mapas de calor reveló que las horas excesivas afectan lateralmente otros predictores clave. Una sub-evaluación evidenció cómo aplicaciones masivas actúan drenando paralelamente la calidad de descanso (Hours of Sleep). Aquellos que usaban YouTube y redes visuales cortas tenían perfiles de sueño más frágiles, empeorando su déficit.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50">
                                            <div className="px-3 py-2 border-b border-white/5">
                                                <span className="text-xs font-mono text-zinc-500">Mapa de Calor Correlacional</span>
                                            </div>
                                            <img src={imgHeatmap} alt="Heatmap de Variables" className="w-full h-auto p-2" loading="lazy" />
                                        </div>
                                        <div className="rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50">
                                            <div className="px-3 py-2 border-b border-white/5">
                                                <span className="text-xs font-mono text-zinc-500">Horas de Sueño por Plataforma</span>
                                            </div>
                                            <img src={imgSueno} alt="Análisis del Sueño" className="w-full h-auto p-2" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 06. Desafíos de Procesamiento */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">06.</span> Retos y Consideraciones
                            </h2>
                            <div className="space-y-3">
                                {consideraciones.map((reto, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-rose-500/20 transition-all duration-300 cursor-pointer"
                                        onClick={() => toggleReto(idx)}
                                    >
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-rose-400">
                                                    {reto.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-sm">{reto.title}</h4>
                                                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{reto.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-zinc-500 ml-4 flex-shrink-0">
                                                {expandedRetos[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>
                                        {expandedRetos[idx] && (
                                            <div className="px-4 pb-4 border-t border-white/5 pt-3 animate-in fade-in">
                                                <p className="text-sm text-zinc-400 mb-3">{reto.description}</p>
                                                <div className="flex items-start gap-2 bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10">
                                                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-emerald-300/80"><strong>Resolución:</strong> {reto.solution}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 07. Trabajo Futuro */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">07.</span> Propuesta Técnica: Detox RRSS (Basado en Datos)
                            </h2>
                            <p className="text-zinc-400 mb-4 text-sm">Basado en la ecuación de regresión obtenida, el informe propone una solución cuantitativa más que un simple "dejar el celular":</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:border-rose-500/20 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target size={16} className="text-amber-400 group-hover:text-amber-300 transition-colors" />
                                        <h4 className="font-bold text-white text-sm">Automonitoreo Activo</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed">Cálculo de límite personal. Si un estudiante cruza su umbral de X {'>'} 4 horas, la probabilidad estadística de afectación académica se dispara a {'>'}95%.</p>
                                </div>
                                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:border-rose-500/20 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity size={16} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                        <h4 className="font-bold text-white text-sm">Micro-Pausas (20/20)</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed">Por cada 20 min de consumo continuo, aplicar 20 segundos sin estímulos para que la memoria de trabajo limpie su <em>buffer</em> antes de estudiar.</p>
                                </div>
                                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:border-rose-500/20 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        <h4 className="font-bold text-white text-sm">Fricción Cognitiva</h4>
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed">Implementar en software "apps de bloqueo" que inserten obstáculos intencionales forzando una decisión consciente del cerebro antes de hacer scroll.</p>
                                </div>
                            </div>
                        </section>

                        {/* 08. Conclusión */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">08.</span> Conclusión
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4 relative overflow-hidden">
                                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl"></div>
                                <p className="relative">
                                    Esta investigación descarta rotundamente las hipótesis nulas e instaura evidencia matemática de que el consumo irrestricto de plataformas *scroll-friendly* daña irreversiblemente la curva de aprendizaje a largo plazo de un estudiante.
                                </p>
                                <p className="relative text-sm border-l-2 border-rose-500/40 pl-4">
                                    Con los resultados avalando los postulados de la *Teoría de la Carga Cognitiva*, la base está servida para que futuras iteraciones o proyectos de software desarrollen entornos reales de "Detox Digital" más inteligentes para universidades e instituciones.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar — 2 cols */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Ficha Técnica */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
                            <h3 className="text-lg font-bold text-zinc-200 mb-4 border-b border-white/10 pb-2">
                                Metadatos del Dataset
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Origen Datos', value: 'Encuestas / CSV Local' },
                                    { label: 'Total Muestras', value: '705 Registros Filtrados' },
                                    { label: 'Naturaleza', value: 'Investigación Transversal' },
                                    { label: 'Var. Dependiente', value: 'Addiction / Cog. Score' },
                                    { label: 'Var. Predictores', value: 'Avg. Daily Hours, Sleep' },
                                    { label: 'Modelo Base', value: 'OLS (Mínimos Cuadrados)' },
                                    { label: 'Resultado R²', value: '0.692 (Alta Significación)' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-white/5 last:border-0">
                                        <span className="text-zinc-500">{item.label}</span>
                                        <span className="text-zinc-200 font-medium text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Galería (Columna Lateral) */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-zinc-200 border-b border-white/10 pb-2">
                                Gráficos Extra
                            </h3>
                            <p className="text-xs text-zinc-500 mb-4">Evidencia y distribución provista por librerías gráficas Python.</p>

                            {/* Resultados */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Infografia de resultados</span>
                                </div>
                                <img
                                    src={imgResultados}
                                    alt="Infografia de resultados"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            {/* T-Student Violín */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Distribución KDE (T-Student)</span>
                                </div>
                                <img
                                    src={imgTStudent}
                                    alt="Test T de Student - Violin plot"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Histograma Consumo */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Campana Poblacional de Horas</span>
                                </div>
                                <img
                                    src={imgHistograma}
                                    alt="Histograma poblacional"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Uso por Plataformas */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Frecuencia por Red Social</span>
                                </div>
                                <img
                                    src={imgPlataformas}
                                    alt="Uso individual en plataformas"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                        </div>

                        {/* Documentos de la Investigación */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-zinc-200 border-b border-white/10 pb-2 flex items-center gap-2">
                                <FileText size={20} className="text-rose-500" />
                                Documentos
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    {
                                        title: "Informe Técnico",
                                        file: docInforme,
                                        desc: "PDF completo con metodología y resultados."
                                    },
                                    {
                                        title: "Presentación Ejecutiva",
                                        file: docPresentacion,
                                        desc: "Diapositivas de la investigación."
                                    }
                                ].map((doc, idx) => (
                                    <div key={idx} className="bg-zinc-900/60 rounded-2xl border border-white/5 p-4 hover:border-rose-500/30 transition-all group">
                                        <h4 className="text-white font-bold text-sm mb-1 group-hover:text-rose-400 transition-colors uppercase tracking-tight">{doc.title}</h4>
                                        <p className="text-[10px] text-zinc-500 mb-3">{doc.desc}</p>
                                        <div className="flex gap-2">
                                            <Button href={doc.file} variant="secondary" className="text-[10px] py-1 h-8 flex-1" target="_blank">
                                                <Eye size={14} className="mr-1" /> Ver
                                            </Button>
                                            <a
                                                href={doc.file}
                                                download
                                                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors border border-white/5 flex items-center justify-center"
                                                title="Descargar"
                                            >
                                                <Download size={16} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stack Tecnológico */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
                            <h3 className="text-lg font-bold text-zinc-200 mb-4 border-b border-white/10 pb-2">
                                Stack Analítico
                            </h3>
                            <div className="space-y-3">
                                {techStack.map((tech, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="w-2 h-2 bg-rose-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                        <div>
                                            <span className="text-sm text-zinc-200 font-medium">{tech.name}</span>
                                            <span className="text-xs text-zinc-600 ml-2">— {tech.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Project4;
