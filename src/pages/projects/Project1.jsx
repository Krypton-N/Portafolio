import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, BookOpen, Cpu, Wrench, Lightbulb, Target, Code, Layers, FlaskConical, ChevronDown, ChevronUp, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const Project1 = () => {
    const project = projectsData.find(p => p.id === 1);
    const [expandedRetos, setExpandedRetos] = useState({});

    const toggleReto = (idx) => {
        setExpandedRetos(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const techStack = [
        { name: 'Python 3.x', role: 'Lenguaje principal' },
        { name: 'SymPy', role: 'Cálculo simbólico' },
        { name: 'NumPy', role: 'Operaciones matriciales' },
        { name: 'PyQt6', role: 'Interfaz gráfica' },
        { name: 'Matplotlib', role: 'Renderizado LaTeX' },
        { name: 'PyInstaller', role: 'Empaquetado .exe' },
    ];

    const retos = [
        {
            icon: <Code size={18} />,
            title: 'Parsing robusto de ecuaciones',
            description: 'El mayor desafío técnico fue construir un parser que aceptara notación humana natural. El problema principal surgió cuando `y` aparecía sola (sin derivadas): SymPy la trataba como UndefinedFunction, causando errores de tipo.',
            solution: 'Se trató `y` como un Symbol durante el parsing y luego se sustituye por Function(\'y\')(x) después de la expansión.',
        },
        {
            icon: <Zap size={18} />,
            title: 'Resonancia en Coeficientes Indeterminados',
            description: 'Implementar correctamente la regla de modificación (multiplicar por x^s cuando la forma propuesta de y_p ya existe en y_c) requirió un análisis cuidadoso.',
            solution: 'Se compara la raíz crítica α + iβ de cada término de g(x) contra las raíces del polinomio característico, usando la multiplicidad como exponente s.',
        },
        {
            icon: <AlertTriangle size={18} />,
            title: 'Pares de raíces complejas conjugadas',
            description: 'Cuando SymPy devuelve raíces complejas, devuelve ambas partes del par conjugado. Generar la solución real (con cos y sin) requirió evitar procesar el mismo par dos veces.',
            solution: 'Se implementó un mecanismo de "marcado" con un set de raíces procesadas para evitar duplicación.',
        },
        {
            icon: <FlaskConical size={18} />,
            title: 'Integración simbólica en Variación de Parámetros',
            description: 'No todas las funciones u_k\' = W_k / W tienen antiderivadas en forma cerrada. SymPy a veces retorna objetos Integral no evaluados.',
            solution: 'Se implementó manejo de errores con try-except para estos casos, garantizando que la aplicación no crashee.',
        },
        {
            icon: <Layers size={18} />,
            title: 'Renderizado LaTeX en PyQt6',
            description: 'Incrustar Matplotlib dentro de PyQt6 como motor de renderizado LaTeX requirió configurar correctamente las figuras para tema oscuro.',
            solution: 'Se usó el backend FigureCanvasQTAgg con fondo transparente, texto blanco y tamaños mínimos adecuados.',
        },
        {
            icon: <Target size={18} />,
            title: 'Diseño de UI responsivo',
            description: 'El primer prototipo tenía problemas graves de espaciado: los resultados se veían aplastados y los gráficos LaTeX eran ilegibles.',
            solution: 'Se realizó un rediseño completo implementando QScrollArea global, tarjetas con minimumHeight generoso (180px) y QSS profesional.',
        },
    ];

    const ecuacionesEjemplo = [
        { tipo: 'Homogénea — Raíces reales distintas', ejemplo: "y'' - 3y' + 2y = 0", metodo: 'Polinomio Característico' },
        { tipo: 'Homogénea — Raíces repetidas', ejemplo: "y'' - 4y' + 4y = 0", metodo: 'Polinomio Característico' },
        { tipo: 'Homogénea — Raíces complejas', ejemplo: "y'' + 4y = 0", metodo: 'Polinomio Característico' },
        { tipo: 'No homogénea — Polinomio', ejemplo: "y'' - 3y' + 2y = 2x² - 6x + 4", metodo: 'Coefs. Indeterminados' },
        { tipo: 'No homogénea — Exponencial', ejemplo: "y'' - 3y' + 2y = eˣ", metodo: 'Coefs. Indeterminados' },
        { tipo: 'No homogénea — Tangente', ejemplo: "y'' + y = tan(x)", metodo: 'Variación de Parámetros' },
        { tipo: 'Cauchy-Euler homogénea', ejemplo: "x²y'' - 2xy' + 2y = 0", metodo: 'Cauchy-Euler' },
        { tipo: 'Cauchy-Euler no homogénea', ejemplo: "x²y'' - 2xy' + 2y = x³", metodo: 'Cauchy-Euler' },
    ];

    const mejorasFuturas = [
        { mejora: 'Métodos numéricos', desc: 'Runge-Kutta, Euler y Adams-Bashforth para EDOs sin solución analítica cerrada.' },
        { mejora: 'Gráficas de solución', desc: 'Visualización de la función solución y(x) además de la expresión simbólica.' },
        { mejora: 'Exportación', desc: 'Exportar pasos de solución como PDF, imagen o archivo LaTeX.' },
        { mejora: 'Sistemas de EDOs', desc: 'Resolver sistemas de ecuaciones diferenciales lineales usando matrices.' },
        { mejora: 'Versión web', desc: 'Flask/Django + MathJax para acceso desde navegador.' },
        { mejora: 'EDOs no lineales', desc: 'Investigar e implementar métodos para ecuaciones diferenciales no lineales.' },
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
                        Aplicación de escritorio que resuelve Ecuaciones Diferenciales Ordinarias (EDOs) de orden <em>n</em> de forma automática, mostrando los resultados paso a paso con notación matemática renderizada en LaTeX.
                    </p>

                    <div className="flex gap-4 mt-8">
                        {project.links?.github && project.links.github !== "#" && (
                            <Button href={project.links.github} variant="secondary">
                                <Github size={20} /> Ver Código
                            </Button>
                        )}
                        {project.links?.demo && project.links.demo !== "#" && (
                            <Button href={project.links.demo} variant="primary">
                                <ExternalLink size={20} /> Demo Live
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
                                <span className="text-rose-500">01.</span> Sobre el Proyecto
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-4">
                                <p>
                                    Antigravity es una aplicación de escritorio que desarrollé con el objetivo de resolver Ecuaciones Diferenciales Ordinarias (EDOs) de orden <em>n</em> de forma automática. La aplicación combina un motor de cálculo simbólico potente con una interfaz gráfica moderna, intuitiva y visualmente atractiva.
                                </p>
                                <p>
                                    Resolver ecuaciones diferenciales manualmente es un proceso largo, propenso a errores y que exige dominio de múltiples técnicas matemáticas. Antigravity automatiza todo ese flujo: desde la interpretación de la ecuación ingresada por el usuario, hasta la selección del método de solución más adecuado, pasando por la resolución simbólica y la verificación del resultado.
                                </p>

                                <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 mt-4">
                                    <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">¿A quién va dirigido?</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        <li>Estudiantes de ingeniería y ciencias que cursan materias de ecuaciones diferenciales.</li>
                                        <li>Profesores que desean una herramienta de verificación rápida de soluciones.</li>
                                        <li>Cualquier profesional que necesite obtener soluciones analíticas de EDOs lineales de forma eficiente.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 02. Problema que Resuelve */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">02.</span> Problema que Resuelve
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                <p>
                                    Cuando comencé a cursar la materia de <strong className="text-zinc-200">Ecuaciones Diferenciales</strong> en el tercer semestre de la carrera IIA en ESCOM, me di cuenta de que el proceso de resolver EDOs de orden elevado requiere un dominio preciso de múltiples pasos: construir el polinomio característico, factorizar raíces, proponer soluciones particulares, aplicar la regla de modificación, construir el Wronskiano, integrar simbólicamente y verificar el resultado. La verdad eso da flojera.
                                </p>
                                <p>Las herramientas existentes presentaban limitaciones:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <h4 className="font-bold text-white text-sm mb-2">Wolfram Alpha</h4>
                                        <p className="text-xs text-zinc-500">Potente, pero solo devuelve el resultado final sin desglosar el procedimiento. Versiones completas son de pago.</p>
                                    </div>
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <h4 className="font-bold text-white text-sm mb-2">Calculadoras en línea</h4>
                                        <p className="text-xs text-zinc-500">Limitadas en tipos de EDOs. Rara vez soportan Cauchy-Euler o Variación de Parámetros con desglose.</p>
                                    </div>
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <h4 className="font-bold text-white text-sm mb-2">Resolución manual</h4>
                                        <p className="text-xs text-zinc-500">Lenta y propensa a errores de cálculo, especialmente en exámenes o tareas con múltiples ejercicios.</p>
                                    </div>
                                </div>
                                <p className="text-sm border-l-2 border-rose-500/40 pl-4 mt-4 text-zinc-300">
                                    Decidí crear Antigravity como una herramienta que no solo resuelve la ecuación, sino que <strong>muestra cada paso intermedio</strong> (solución homogénea, solución particular, solución general, verificación), permitiendo al estudiante entender el proceso y verificar su propio trabajo manual.
                                </p>
                            </div>
                        </section>

                        {/* 03. Arquitectura del Sistema */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">03.</span> Arquitectura del Sistema
                            </h2>
                            <div className="space-y-6">
                                {/* Descripción de la arquitectura */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm">
                                    <p className="mb-4">Antigravity sigue una <strong className="text-zinc-200">arquitectura modular por capas</strong> con separación clara entre la lógica de negocio (resolución matemática), las utilidades de soporte, y la capa de presentación (interfaz gráfica).</p>

                                    {/* Estructura de archivos */}
                                    <div className="bg-zinc-950/60 rounded-xl p-4 border border-white/5 font-mono text-sm">
                                        <p className="text-rose-400 font-bold mb-3 font-sans text-xs uppercase tracking-wider">Estructura de Archivos</p>
                                        <div className="space-y-1 text-zinc-300">
                                            <p className="text-amber-400">Programa_EDOS/</p>
                                            <p className="pl-4">├── <span className="text-zinc-500">antigravity_core/</span></p>
                                            <p className="pl-8">├── <span className="text-emerald-400">main.py</span> <span className="text-zinc-600 text-xs ml-2">← Punto de entrada</span></p>
                                            <p className="pl-8">├── <span className="text-emerald-400">ode_solver.py</span> <span className="text-zinc-600 text-xs ml-2">← Motor de resolución (555 líneas)</span></p>
                                            <p className="pl-8">├── <span className="text-emerald-400">gui.py</span> <span className="text-zinc-600 text-xs ml-2">← Interfaz gráfica PyQt6 (519 líneas)</span></p>
                                            <p className="pl-8">├── <span className="text-emerald-400">utils.py</span> <span className="text-zinc-600 text-xs ml-2">← Parsing y formateo LaTeX (127 líneas)</span></p>
                                            <p className="pl-8">├── <span className="text-zinc-500">requirements.txt</span></p>
                                            <p className="pl-8">└── <span className="text-zinc-500">dist/</span></p>
                                            <p className="pl-12">└── <span className="text-rose-400">Antigravity.exe</span> <span className="text-zinc-600 text-xs ml-2">← Ejecutable (~100 MB)</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Módulos del sistema */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <Zap size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">ode_solver.py</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Motor de resolución. Contiene la clase <code className="text-rose-300 bg-rose-500/10 px-1 rounded">DifferentialEquation</code> con métodos para solución homogénea, coeficientes indeterminados, variación de parámetros, Cauchy-Euler y verificación.
                                        </p>
                                    </div>
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <Layers size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">gui.py</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Interfaz gráfica con teclado matemático virtual, vista previa en tiempo real de la ecuación en LaTeX, campos dinámicos de condiciones iniciales y tarjetas de resultados expandibles.
                                        </p>
                                    </div>
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <Code size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">utils.py</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Parser que analiza cadenas de texto y extrae orden, coeficientes y función forzada usando expresiones regulares y <code className="text-rose-300 bg-rose-500/10 px-1 rounded">sympy.parse_expr</code>.
                                        </p>
                                    </div>
                                    <div className="bg-zinc-950/50 p-5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                                                <BookOpen size={18} className="text-rose-400" />
                                            </div>
                                            <h4 className="font-bold text-white text-sm">main.py</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            Punto de entrada. Inicializa la aplicación Qt, crea la ventana principal y contiene código de demostración por consola utilizado durante el desarrollo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 04. Implementación — Métodos de Resolución */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">04.</span> Métodos de Resolución Implementados
                            </h2>
                            <div className="space-y-6">
                                {/* Parser */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center gap-2">
                                        <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        Parser de Ecuaciones
                                    </h3>
                                    <p>
                                        Uno de los retos más interesantes fue construir un parser capaz de interpretar ecuaciones escritas en texto plano de forma natural. El usuario puede escribir algo como:
                                    </p>
                                    <div className="bg-zinc-950/60 rounded-lg p-3 border border-white/5 font-mono text-sm text-center text-zinc-200">
                                        y'' + 4*y' + 4*y = exp(2*x)
                                    </div>
                                    <p>Y el parser se encarga de:</p>
                                    <ol className="list-decimal pl-5 text-sm space-y-1">
                                        <li><strong className="text-zinc-200">Normalizar</strong> la cadena (eliminar espacios, convertir <code>^</code> a <code>**</code>).</li>
                                        <li><strong className="text-zinc-200">Separar</strong> lado izquierdo y derecho por el signo <code>=</code>.</li>
                                        <li><strong className="text-zinc-200">Reemplazar derivadas</strong> usando regex: <code>y'''</code> → <code>Derivative(y, x, 3)</code>.</li>
                                        <li><strong className="text-zinc-200">Parsear</strong> la expresión con <code>sympy.parse_expr</code>.</li>
                                        <li><strong className="text-zinc-200">Clasificar</strong> cada término como coeficiente o función forzada.</li>
                                    </ol>
                                </div>

                                {/* Solución Homogénea */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center gap-2">
                                        <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        Solución Homogénea
                                    </h3>
                                    <p>
                                        El corazón del módulo homogéneo es la construcción y resolución del <strong className="text-zinc-200">polinomio característico</strong>. Se utiliza <code className="text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded text-xs">sympy.roots()</code> porque devuelve un diccionario de raíz → multiplicidad, fundamental para manejar tres casos:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                                        <div className="bg-zinc-950/50 rounded-lg p-3 border border-white/5 text-center">
                                            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Raíz real distinta</p>
                                            <p className="text-zinc-300 text-sm font-mono">Cᵢ eʳˣ</p>
                                        </div>
                                        <div className="bg-zinc-950/50 rounded-lg p-3 border border-white/5 text-center">
                                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Raíz real repetida</p>
                                            <p className="text-zinc-300 text-sm font-mono">Cᵢ xʲ eʳˣ</p>
                                        </div>
                                        <div className="bg-zinc-950/50 rounded-lg p-3 border border-white/5 text-center">
                                            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Complejas conjugadas</p>
                                            <p className="text-zinc-300 text-sm font-mono text-xs">eᵅˣ(C cos βx + C sin βx)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Coeficientes Indeterminados */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center gap-2">
                                        <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        Coeficientes Indeterminados
                                    </h3>
                                    <p>
                                        Implementa la técnica clásica para encontrar una solución particular y_p cuando g(x) tiene una forma específica (polinomios, exponenciales, seno/coseno o combinaciones).
                                    </p>
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5 mt-2">
                                        <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3">Algoritmo implementado:</p>
                                        <ol className="list-decimal pl-5 text-sm space-y-2">
                                            <li><strong className="text-zinc-200">Descompone</strong> g(x) en términos sumandos.</li>
                                            <li><strong className="text-zinc-200">Analiza</strong> la forma de cada término: parte exponencial, trigonométrica y polinomial.</li>
                                            <li><strong className="text-zinc-200">Detecta resonancia:</strong> compara α + iβ con las raíces del polinomio característico. Si hay coincidencia, aplica la <span className="text-rose-400">regla de modificación</span> multiplicando por x^s.</li>
                                            <li><strong className="text-zinc-200">Construye</strong> la forma propuesta con coeficientes simbólicos desconocidos.</li>
                                            <li><strong className="text-zinc-200">Sustituye</strong> en la EDO y resuelve el sistema de ecuaciones resultante.</li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Variación de Parámetros */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center gap-2">
                                        <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        Variación de Parámetros
                                    </h3>
                                    <p>
                                        Método más general, usado como <strong className="text-zinc-200">fallback</strong> cuando Coeficientes Indeterminados no es aplicable (por ejemplo, para g(x) = tan(x) o g(x) = sec(x)).
                                    </p>
                                    <ol className="list-decimal pl-5 text-sm space-y-2 mt-2">
                                        <li>Obtener el conjunto fundamental de soluciones de la homogénea.</li>
                                        <li>Construir la <strong className="text-zinc-200">Matriz Wronskiana</strong> W.</li>
                                        <li>Calcular el determinante det(W).</li>
                                        <li>Aplicar la <strong className="text-zinc-200">regla de Cramer</strong> para cada columna k.</li>
                                        <li>Integrar u_k' = det(W_k) / W para obtener los parámetros u_k.</li>
                                        <li>Solución particular: y_p = Σ u_k · y_k.</li>
                                    </ol>
                                </div>

                                {/* Cauchy-Euler */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4 relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                                    <h3 className="text-lg font-bold text-rose-400 mb-2 flex items-center gap-2 relative">
                                        <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                                        Cauchy-Euler
                                    </h3>
                                    <p className="relative">
                                        Para ecuaciones de la forma a_n·x^n·y^(n) + ... + a_0·y = g(x), el método realiza una <strong className="text-zinc-200">detección automática</strong> verificando que cada coeficiente es proporcional a x^k.
                                    </p>
                                    <p className="relative text-sm">
                                        Si se confirma, aplica la <strong className="text-zinc-200">sustitución x = eᵗ</strong> que transforma la ecuación en una EDO con coeficientes constantes, construyendo el polinomio operador con factoriales descendentes, resolviendo recursivamente y sustituyendo t = ln(x) en la solución final.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 05. Interfaz Gráfica */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">05.</span> Interfaz Gráfica
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                <p>
                                    La GUI fue diseñada siguiendo principios de <strong className="text-zinc-200">UX moderno</strong> con un tema oscuro profesional implementado con PyQt6 y estilos QSS.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                    <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm"><strong className="text-zinc-200">Teclado matemático virtual</strong> organizado en tres secciones: funciones, numpad y operadores.</p>
                                    </div>
                                    <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm"><strong className="text-zinc-200">Vista previa en tiempo real</strong> de la ecuación renderizada en LaTeX dentro de un widget Matplotlib.</p>
                                    </div>
                                    <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm"><strong className="text-zinc-200">Campos dinámicos</strong> de condiciones iniciales generados automáticamente según el orden de la EDO.</p>
                                    </div>
                                    <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm"><strong className="text-zinc-200">Tarjetas expandibles</strong> para cada paso de la solución con título en verde y contenido LaTeX.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 06. Resultados */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">06.</span> Ecuaciones Compatibles
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-inner backdrop-blur-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Tipo</th>
                                                <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Ejemplo</th>
                                                <th className="text-left px-5 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Método</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ecuacionesEjemplo.map((eq, idx) => (
                                                <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-5 py-3 text-zinc-300 font-medium">{eq.tipo}</td>
                                                    <td className="px-5 py-3 font-mono text-rose-300 text-xs">{eq.ejemplo}</td>
                                                    <td className="px-5 py-3">
                                                        <span className="text-xs font-medium bg-rose-500/10 text-rose-300 px-2 py-1 rounded-full border border-rose-500/20">{eq.metodo}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Características de la salida */}
                            <div className="mt-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 shadow-inner backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-4">Características de la Salida</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        'Ecuación Original renderizada',
                                        'Solución Homogénea (y_c)',
                                        'Solución Particular (y_p)',
                                        'Solución General (y = y_c + y_p)',
                                        'Método utilizado',
                                        'Verificación automática ✅',
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-zinc-400">
                                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 07. Retos Técnicos */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">07.</span> Retos Técnicos
                            </h2>
                            <div className="space-y-3">
                                {retos.map((reto, idx) => (
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
                                                    <Wrench size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-emerald-300/80"><strong>Solución:</strong> {reto.solution}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 08. Mejoras Futuras */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">08.</span> Mejoras Futuras
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {mejorasFuturas.map((item, idx) => (
                                    <div key={idx} className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 hover:border-rose-500/20 transition-colors group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lightbulb size={14} className="text-amber-400 group-hover:text-amber-300 transition-colors" />
                                            <h4 className="font-bold text-white text-sm">{item.mejora}</h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 09. Conclusión */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">09.</span> Conclusión
                            </h2>
                            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4 relative overflow-hidden">
                                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl"></div>
                                <p className="relative">
                                    El desarrollo de <strong className="text-zinc-200">Antigravity</strong> fue una experiencia que me permitió fusionar dos áreas que me apasionan: la programación y las matemáticas. Construir esta herramienta me obligó a comprender profundamente cada método de resolución de EDOs no como fórmulas que se memorizan, sino como algoritmos que pueden ser implementados y automatizados.
                                </p>
                                <p className="relative text-sm border-l-2 border-rose-500/40 pl-4">
                                    Antigravity no es solo un programa que resuelve ecuaciones diferenciales: es la evidencia de que entendí lo suficiente como para enseñarle a una computadora a hacerlo.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar — 2 cols */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Galería */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-zinc-200 border-b border-white/10 pb-2">
                                Galería
                            </h3>
                            <p className="text-xs text-zinc-500">Interfaz principal y panel de resultados de la aplicación.</p>

                            {/* Interfaz Principal */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Interfaz Principal</span>
                                </div>
                                <img
                                    src="/src/resources/projects/Project_AntigravityEDOs/antigravity_interface.png"
                                    alt="Interfaz principal de Antigravity"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Panel de Resultados */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Panel de Resultados</span>
                                </div>
                                <img
                                    src="/src/resources/projects/Project_AntigravityEDOs/antigravity_results.png"
                                    alt="Panel de resultados paso a paso"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Diagrama de Arquitectura */}
                            <div className="rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
                                <div className="px-4 py-2 border-b border-white/5 bg-zinc-950/50">
                                    <span className="text-xs font-mono text-zinc-500">Arquitectura del Sistema</span>
                                </div>
                                <img
                                    src="/src/resources/projects/Project_AntigravityEDOs/architecture_diagram.png"
                                    alt="Diagrama de arquitectura del sistema"
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Ficha Técnica */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
                            <h3 className="text-lg font-bold text-zinc-200 mb-4 border-b border-white/10 pb-2">
                                Ficha Técnica
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Autor', value: 'Noe Rodriguez' },
                                    { label: 'Institución', value: 'ESCOM — IPN' },
                                    { label: 'Materia', value: 'Ecuaciones Diferenciales (3er Sem.)' },
                                    { label: 'Rol', value: 'Desarrollo individual' },
                                    { label: 'Líneas de código', value: '~1,200+ líneas (Python)' },
                                    { label: 'Ejecutable', value: 'Antigravity.exe (~100 MB)' },
                                    { label: 'Estado', value: 'Funcional y ejecutable' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-white/5 last:border-0">
                                        <span className="text-zinc-500">{item.label}</span>
                                        <span className="text-zinc-200 font-medium text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stack Tecnológico */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
                            <h3 className="text-lg font-bold text-zinc-200 mb-4 border-b border-white/10 pb-2">
                                Stack Tecnológico
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

                        {/* Metodología */}
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm shadow-inner">
                            <h3 className="text-lg font-bold text-zinc-200 mb-4 border-b border-white/10 pb-2">
                                Metodología
                            </h3>
                            <p className="text-sm text-zinc-500 mb-4">Desarrollo incremental en tres fases:</p>
                            <div className="space-y-4">
                                <div className="relative pl-6 before:absolute before:left-[7px] before:top-6 before:bottom-0 before:w-px before:bg-white/10">
                                    <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                                    </div>
                                    <h4 className="text-sm font-bold text-white">Fase 1: Motor de Resolución</h4>
                                    <p className="text-xs text-zinc-500 mt-1">Lógica matemática completa (ode_solver.py + utils.py). Validación por consola.</p>
                                </div>
                                <div className="relative pl-6 before:absolute before:left-[7px] before:top-6 before:bottom-0 before:w-px before:bg-white/10">
                                    <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                                    </div>
                                    <h4 className="text-sm font-bold text-white">Fase 2: Interfaz Gráfica</h4>
                                    <p className="text-xs text-zinc-500 mt-1">Prototipo funcional → Rediseño completo con tema oscuro profesional y tarjetas expandibles.</p>
                                </div>
                                <div className="relative pl-6">
                                    <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                                    </div>
                                    <h4 className="text-sm font-bold text-white">Fase 3: Integración y Empaquetado</h4>
                                    <p className="text-xs text-zinc-500 mt-1">Conexión frontend-backend, manejo de errores, estilo visual y PyInstaller → .exe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Project1;
