import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Search, Cpu, MemoryStick, Monitor, Laptop } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ImageComparisonViewer from '../../components/ui/ImageComparisonViewer';

const Project2 = () => {
    const project = projectsData.find(p => p.id === 2);
    const [viewerIndex, setViewerIndex] = useState(null);

    const imageIds = [10, 63, 72, 116, 180, 278, 287, 354, 610];

    const images = imageIds.map((id, idx) => ({
        beforeSrc: `/src/resources/projects/Project_AI_WorkFlow/antes_${id}.png`,
        afterSrc: `/src/resources/projects/Project_AI_WorkFlow/despues_${id}.png`,
        sampleLabel: `Muestra #${idx + 1}`,
    }));

    return (
        <>
            <div className="fixed inset-0 bg-zinc-950/80 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }} />

            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-8 transition-colors group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver
                </Link>

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
                        {project.description}
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

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-rose-500">01.</span> Sobre el Proyecto
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-4">
                                <p>Desarrollo de un workflow de IA diseñado para transformar imágenes borrosas en piezas de alta definición (2K/4K). A diferencia de un escalado tradicional, este sistema entiende la imagen para reconstruirla en tres fases.</p>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li><strong>Etapa Física:</strong> Agranda la imagen matemáticamente.</li>
                                    <li><strong>Etapa Artística (Global):</strong> Refina texturas y luces sin cambiar la composición.</li>
                                    <li><strong>Etapa Quirúrgica (Rostros):</strong> Detecta los rostros y los reconstruye en alta definición.</li>
                                </ol>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-rose-500">02.</span> Workflow y Nodos paso a paso
                            </h2>

                            <div className="space-y-8">
                                {/* Etapa 1 */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-xl font-bold text-rose-400 mb-2">ETAPA 1: Preparación y Escalado Inicial</h3>
                                    <p>El objetivo aquí es hacer el lienzo más grande antes de que la IA "piense".</p>

                                    <div className="space-y-4 mt-4 text-zinc-300">
                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">1. Load Image (Cargar Imagen)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Este es el punto de entrada. Aquí se carga la foto pequeña o borrosa.</p>
                                            <p className="text-sm mt-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">image:</span> Eliges el archivo de tu PC.</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">2. UpscaleModelLoader (Cargador de Modelo de Escalado)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Carga la herramienta que estira los píxeles matemáticamente sin IA reflexiva.</p>
                                            <p className="text-sm mt-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">model_name:</span> <code>4x-UltraSharp</code>. Es excelente porque mantiene la nitidez sin inventar cosas raras (alucinaciones).</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">3. ImageUpscaleWithModel (Escalar Imagen con Modelo)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Aplica el 4x-UltraSharp que se cargo anteriormente a tu imagen pequeña original. Si tu imagen medía 512x512, ahora medirá 2048x2048 (4 veces más su tamaño original).</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">4. ImageScaleToTotalPixels (Escalar a Píxeles Totales)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Reduce un poco la imagen gigante generada en el paso anterior para ajustarla a una resolución estándar (ej. 2K o 4K) y no saturar la memoria VRAM de la GPU.</p>
                                            <div className="mt-3 bg-zinc-900/50 rounded-lg p-3 border border-white/5">
                                                <p className="text-sm mb-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes Principales</span></p>
                                                <ul className="list-disc pl-5 text-sm space-y-1">
                                                    <li><strong>upscale_method:</strong> <code>lanczos</code>. Es el algoritmo matemático más nítido para reducir imágenes, ideal para no perder calidad visual en el Downsampling (reducción del tamaño de la imagen eliminando pixeles).</li>
                                                    <li><strong>megapixels:</strong> Define el tamaño matemático final.
                                                        <ul className="list-[circle] pl-5 mt-1 text-zinc-400">
                                                            <li><code>2.0</code> = 1080p (Full HD).</li>
                                                            <li><code>4.0</code> = 2K.</li>
                                                            <li><code>8.0</code> = 4K.</li>
                                                        </ul>
                                                    </li>
                                                    <li><strong>resolution_steps</strong> <code>:1</code> Este valor define en cuantos pasos se hara la reduccion, entre más grande sea la imagen de entrada más pasos se recomienda poner, para no perder la nitidez de la imagen original</li>
                                                </ul>
                                            </div>
                                            <p className="text-xs text-amber-500 mt-3 pt-2 border-t border-amber-500/10">💡 <strong>Nota:</strong> Si la GPU es de 8GB de VRAM o menor, procurar mantener el valor entre 2.0 y 4.0 para evitar errores de <em>Out of Memory</em>.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Etapa 2 */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4">
                                    <h3 className="text-xl font-bold text-rose-400 mb-2">ETAPA 2: Refinamiento Global (ControlNet + KSampler)</h3>
                                    <p>Aquí es donde el modelo difusor ("Realistic Vision") repinta la imagen en alta definición para infundirle realismo y corregir imperfecciones, pero está "amarrado" por ControlNet para obligarlo a respetar escrupulosamente los contornos de la foto original.</p>

                                    <div className="space-y-4 mt-4 text-zinc-300">
                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">5. CheckpointLoaderSimple (Cargador de Modelo Principal)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Es el cerebro creativo del flujo.</p>
                                            <p className="text-sm mt-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">ckpt_name:</span> <code>RealisticVisionV60</code>. Perfecto para fotografías analógicas y realistas.</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">6. ControlNetLoader (Cargador ControlNet)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Carga a nuestro "policía digital" que vigila a la IA generativa.</p>
                                            <p className="text-sm mt-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">control_net_name:</span> Modelo tipo <code>Tile</code> (mosaico). Este modelo es la pieza angular de todo el workflow: literalmente le dice a la IA "Mejora los detalles y la textura, pero bajo ningún pretexto cambies la estructura general ni crees objetos nuevos irreales".</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">7. CLIP Text Encode (Prompts Globales)</h4>
                                            <p className="text-sm mt-1 mb-2"><strong>Función:</strong> Envía la directiva de texto para orientar la pincelada base de la IA generativa a lo largo y ancho del póster de la foto.</p>
                                            <ul className="list-disc pl-5 text-sm space-y-1">
                                                <li><strong className="text-emerald-400">Positivo:</strong> Incluimos modificadores de alta lealtad como <code>Masterpiece, sharp focus, 8k</code>.</li>
                                                <li><strong className="text-red-400">Negativo:</strong> Expulsamos los detritos visuales con <code>blur, low quality, watermark</code>.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">8. VAE Encode</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Este bloque se asemeja a un compresor zip que traduce tu imagen RGB (píxeles reales) hacia un estado transitorio y matemático llamado espacio "Latente", que es el entorno natural de ruido tridimensional en donde las IAs de difusión son capaces de operar sus transformaciones.</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">9. ApplyContro
                                                lNet (Aplicar ControlNet)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Es la batidora que fusiona la imagen original condicional junto las instrucciones estrictas del ControlNet Tile.</p>
                                            <p className="text-sm mt-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">strength (Fuerza):</span> <code>1.0</code>. Esto impone que el sistema estructure el layout de la pieza respetando la original al 100%. Mutilar o rebajar este número incrementaría dramáticamente el nivel de alucinaciones locas que produciría el generador.</p>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">10. KSampler (El Horno de Renderizado)</h4>
                                            <p className="text-sm mt-1 mb-2"><strong>Función:</strong> El motor principal. Aquí ocurre la magia pura del proceso denominado "Img2Img" (Imagen a Imagen). Lee la data base, el ControlNet, el prompt y ejecuta las pasadas iterativas reduciendo el ruido hasta hornear un re-pintado foto-realista.</p>
                                            <div className="bg-zinc-900/50 rounded-lg p-3 border border-white/5">
                                                <ul className="list-disc pl-5 text-sm space-y-2">
                                                    <li>
                                                        <span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20 mr-2">Ajuste Crítico</span>
                                                        <strong>denoise (Eliminar ruido / Creatividad IA):</strong> Normalmente se mantiene en <code>0.3</code>. Configurar correctamente esto hace o destruye la imagen:
                                                        <ul className="list-[square] pl-5 mt-2 space-y-1 text-zinc-400">
                                                            <li><code>0.1 - 0.25:</code> Prácticamente no modifica texturas, limpia fallos leves sin ser un restaurador poderoso.</li>
                                                            <li><code className="text-rose-400 font-bold">0.3 - 0.4:</code> (Punto dulce de restauración) Limpia el ruido en fotos viejas pero te ayuda a regenerar el granulado fotográfico de la piel, hilos en la ropa y luces.</li>
                                                            <li><code>0.5+:</code> El modelo se empieza a volver muy proactivo y modificará la identidad original de las personas o incluso borrar ojeras de formas ficticias, o mutar collares por otras bisuterías totalmente distintas.</li>
                                                        </ul>
                                                    </li>
                                                    <li><strong>steps (Pasos):</strong> <code>25</code> iteraciones de reducción de ruido son el umbral óptimo calidad-tiempo para RealisticVision.</li>
                                                    <li><strong>sampler:</strong> <code>dpmpp_2m</code>. El estándar de oro técnico hoy en día para generar retratos o personas reales que aparenten no estar generados por CGI.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">11. VAEDecodeTiled (Decodificar en Mosaico)</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Ejecuta el proceso inverso al nodo de Encode (8). Toma la ruidosa ecuación latente modificada y repintada por la IA y la materializa de vuelta al mundo normal convirtiéndola de nuevo en píxeles RGB legibles y exportables (archivos con extensión PNG).</p>
                                            <p className="text-sm mt-2 text-zinc-400"><strong>¿Por qué se llama "Tiled" (Por trozos o segmentos) y no normal?:</strong> Principalmente porque a estas alturas nuestra imagen internamente posee un peso demencial de subinformación tridimensional. Si le ordenamos al programa exportar un 4K todo de un solo golpe (toda el área), es factible que superemos la capacidad de carga del cuello de botella de la memoria de video y colapse la aplicación dando error generalizado. Decodificar por azulejos ("Tiled") significa enviar a render por zonas segmentadas (primero renderiza una esquina de la foto, la saca y la pega, luego sigue a la próxima zona, hasta completar e hilar todo el canvas de 4K).</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Etapa 3 */}
                                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-zinc-400 leading-relaxed shadow-inner backdrop-blur-sm space-y-4 relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                                    <h3 className="text-xl font-bold text-rose-400 mb-2 relative">ETAPA 3: El Cirujano de Rostros (FaceDetailer)</h3>
                                    <p className="relative">La imagen compuesta global a gran escala probablemente se vea asombrosa ya, pero los detalles intrincados —especialmente rostros humanos lejanos al foco principal de la cámara— comúnmente exhibirán dientes extraños u ojos de pez, producto indirecto del mismo escalado orgánico. Este paso correctivo extra está diseñado para resolver ese inconveniente, detectando micro áreas espaciales ("boxes" faciales) para reconstruirlas con alta fidelidad usando un minirender secundario y volverlas a unir cosidas sin que notes la pega.</p>

                                    <div className="space-y-4 mt-6 text-zinc-300 relative">
                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5">
                                            <h4 className="font-bold text-white">12. UltralyticsDetectorProvider & SAMLoader</h4>
                                            <p className="text-sm mt-1"><strong>Función:</strong> Constituyen los módulos del sensor de lectura de segmentación de objetos visuales basados en Yolo. Actúan como los "ojos" del flujo para escanear a nivel rasterizado en qué coordenadas numéricas X e Y está localizado o dibujado un rostro.</p>
                                            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                                                <li><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes</span> <span className="font-medium text-zinc-200 ml-2">model_name:</span> <code>face_yolov8m</code>. Este modelo está entrenado pre-conceptualmente y es responsable de dibujar un rectángulo limitador preciso para capturar la cara donde sea hallada.</li>
                                                <li><strong>SAM (Segment Anything Model):</strong> Complementa al anterior. Convierte el cuadrado simplista que YOLO descubrió, transformándolo en un recorte silueteado por pixeles del contorno real facial, aislando mejillas y pelos de forma más precisa de espaldas.</li>
                                            </ul>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white">13. CLIP Text Encode (Prompts Exclusivo para Rostro)</h4>
                                                <p className="text-sm mt-1"><strong>Función Extra:</strong> Estos Nodos extra de texto se conectan singularmente al FaceDetailer. Sus dictados textuales aplican modificadores semánticos que prioricen y dirijan atención absoluta a la generación fina facial, por ejemplo listando etiquetas como <code>skin texture, highly detailed skin pores</code> contra los prompts negativos de no portar maquillajes plastificados.</p>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-950/50 p-4 rounded-xl border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"></span>
                                                14. FaceDetailer
                                            </h4>
                                            <p className="text-sm mt-2"><strong>Función:</strong> Este bloque unifica y concreta la reconstrucción final. Ejecutará suboperaciones internas equivalentes a recortar la miniatura del pedacito de cara detectada, la reescala al vacío dándole su propia resolución extra alta dentro de su recuadro privado, re-inyecta allí el proceso Img2Img, pinta una cara restaurada soberbia, luego desescala el mosaico procesado de vuelta a su cuadrante de origen, lo alinea, camufla el difuminado exterior o borde ("feather") y plasta la textura reconstruida en la misma posición relativa sobre su base nodriza sin interrumpir la composición original de luz. Todo automatizado.</p>
                                            <div className="mt-3 bg-zinc-900/50 rounded-lg p-3 border border-rose-500/10">
                                                <p className="text-sm mb-2"><span className="text-rose-500 font-mono text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">Ajustes Vitales</span></p>
                                                <ul className="list-disc pl-5 text-sm space-y-2">
                                                    <li><strong>guide_size:</strong> <code>512</code>. A este valor se va a extruir la minúscula cara interna de la foto antes de pintarla. Si aspiras a un detalle microoscópico en fotogramas de primeros planos, súbelo a <code>768</code> o <code>1024</code>, a costa de una inmensa pero provechosa lentitud del programa en general.</li>
                                                    <li><strong>guide_size_for:</strong> <code>True</code>. Bandera para activar la obligatoriefad interna antes mencionada.</li>
                                                    <li><strong>denoise:</strong> Ajustado idealmente de base en <code>0.4</code> o <code>0.5</code>. Debido a que aquí queremos una mutación de píxeles mucho más perdonable para ayudar a los ojos perdidos y dientes fundidos a que logren reconstruir estructura nueva, el porcentaje es más alto comparado a los de la etapa global.</li>
                                                    <li><strong>drop_size:</strong> <code>10</code>. Regla crucial que prohíbe y aborta el intento de reconstruir las caritas ultra microscópicas en el horizonte (tipo de una masa en la calle), si el borde de recuadro total mide menos de diez milímetros relativos (o 10 píxeles). Ahorra cómputo valiosísimo intentando reparar manchas borrosas sin importancia estética en macro en la escena.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-lg font-bold text-zinc-200 border-b border-white/10 pb-2">
                            Galería de Resultados
                        </h3>
                        <p className="text-sm text-zinc-500">Comparación antes y después del workflow de IA. <span className="text-rose-400">Haz clic para comparar con lupa.</span></p>
                        {imageIds.map((id, idx) => (
                            <div
                                key={id}
                                className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-sm shadow-lg hover:border-rose-500/30 transition-all duration-300 cursor-pointer group/card"
                                onClick={() => setViewerIndex(idx)}
                            >
                                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                                    <span className="text-xs font-mono text-zinc-500">Muestra #{idx + 1}</span>
                                    <span className="text-xs text-zinc-600 group-hover/card:text-rose-400 transition-colors flex items-center gap-1">
                                        <Search size={12} />
                                        Comparar
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-px bg-white/5">
                                    <div className="relative group bg-zinc-950 overflow-hidden">
                                        <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-widest bg-zinc-900/80 text-zinc-400 px-2 py-0.5 rounded-md border border-white/10">Antes</span>
                                        <img
                                            src={`/Portafolio/Project_AI_WorkFlow/antes_${id}.png`}
                                            alt={`Antes - Muestra ${id}`}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="relative group bg-zinc-950 overflow-hidden">
                                        <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-widest bg-rose-500/80 text-white px-2 py-0.5 rounded-md border border-rose-400/30">Después</span>
                                        <img
                                            src={`/Portafolio/Project_AI_WorkFlow/despues_${id}.png`}
                                            alt={`Después - Muestra ${id}`}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hardware Specs Section */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-rose-500">03.</span> Entorno de Ejecución
                    </h2>
                    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-inner relative overflow-hidden">
                        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl"></div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 relative">
                            <div className="bg-zinc-800/80 p-4 rounded-2xl border border-white/10">
                                <Laptop size={40} className="text-rose-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Lenovo LOQ 15IRX10</h3>
                                <p className="text-zinc-500 text-sm mt-1">Laptop utilizada para ejecutar el workflow de restauración</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                            <div className="bg-zinc-950/50 rounded-xl p-5 border border-white/5 flex items-start gap-4 hover:border-rose-500/20 transition-colors">
                                <div className="bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                                    <Cpu size={22} className="text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Procesador</p>
                                    <p className="text-white font-semibold mt-1">Intel Core i7 13650HX</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">14 núcleos / 20 hilos</p>
                                </div>
                            </div>
                            <div className="bg-zinc-950/50 rounded-xl p-5 border border-white/5 flex items-start gap-4 hover:border-rose-500/20 transition-colors">
                                <div className="bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                                    <MemoryStick size={22} className="text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Memoria RAM</p>
                                    <p className="text-white font-semibold mt-1">24 GB</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">DDR5</p>
                                </div>
                            </div>
                            <div className="bg-zinc-950/50 rounded-xl p-5 border border-white/5 flex items-start gap-4 hover:border-rose-500/20 transition-colors">
                                <div className="bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                                    <Monitor size={22} className="text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Tarjeta de Video (GPU)</p>
                                    <p className="text-white font-semibold mt-1">NVIDIA RTX 5050</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">8 GB de VRAM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workflow Preview Image */}
                <section className="mt-16 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-rose-500">04.</span> Vista del Workflow en ComfyUI
                    </h2>
                    <div className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-sm shadow-lg">
                        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs font-mono text-zinc-500">ComfyUI — Workflow completo</span>
                            <span className="text-xs text-zinc-600">Haz clic para ampliar</span>
                        </div>
                        <a href="/Portafolio/Project_AI_WorkFlow/preview.png" target="_blank" rel="noopener noreferrer" className="block">
                            <img
                                src="/Portafolio/Project_AI_WorkFlow/preview.png"
                                alt="Vista completa del workflow de restauración en ComfyUI"
                                className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                                loading="lazy"
                            />
                        </a>
                    </div>
                </section>
            </div>

            {/* Image Comparison Viewer Modal */}
            <ImageComparisonViewer
                isOpen={viewerIndex !== null}
                onClose={() => setViewerIndex(null)}
                images={images}
                currentIndex={viewerIndex ?? 0}
                onNavigate={setViewerIndex}
            />
        </>
    );
};

export default Project2;
