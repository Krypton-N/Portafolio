import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Cpu, MemoryStick, Monitor, Maximize2, Workflow } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import SectionMarker from '../../components/ui/SectionMarker';
import BeforeAfterSlider from '../../components/ui/BeforeAfterSlider';
import ImageComparisonViewer from '../../components/ui/ImageComparisonViewer';
import Reveal from '../../components/motion/Reveal';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const Stat = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="font-display text-2xl md:text-3xl font-bold text-white leading-none">{value}</span>
        <span className="font-mono text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
);

const Setting = ({ label = 'Settings', children }) => (
    <div className="bg-zinc-950/60 rounded-lg p-3 border border-white/5 mt-3">
        <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider">{label}</span>
        <div className="mt-1.5 text-sm text-zinc-300 space-y-1">{children}</div>
    </div>
);

const K = ({ children }) => (
    <code className="font-mono text-xs text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">{children}</code>
);

/* A ComfyUI-style node on the pipeline rail */
const NodeCard = ({ n, name, io, children, highlight }) => (
    <div className="relative pl-9 pb-5 last:pb-0">
        {/* port on the rail */}
        <span className="absolute left-0 top-4 -translate-x-1/2 flex h-3.5 w-3.5 items-center justify-center">
            <span className={`h-2.5 w-2.5 rounded-full border-2 ${highlight ? 'border-rose-400 bg-rose-500' : 'border-zinc-600 bg-zinc-950'}`} />
        </span>
        <div className={`rounded-xl overflow-hidden border bg-zinc-900/50 backdrop-blur-sm transition-colors ${highlight ? 'border-rose-500/40 shadow-[0_0_24px_rgba(244,63,94,0.12)]' : 'border-white/8 hover:border-rose-500/20'}`}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <span className="font-mono text-xs text-rose-200 tracking-tight">
                    <span className="text-zinc-600">{String(n).padStart(2, '0')}</span> · {name}
                </span>
                {io && <span className="font-mono text-[10px] text-zinc-600 hidden sm:inline">{io}</span>}
            </div>
            <div className="p-4 text-sm text-zinc-400 leading-relaxed">{children}</div>
        </div>
    </div>
);

const StageHeader = ({ index, name, title, tagline }) => (
    <div className="mb-8">
        <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl md:text-6xl font-bold text-zinc-800 leading-none">{index}</span>
            <div>
                <span className="font-mono text-xs text-rose-400 uppercase tracking-[0.2em]">Stage · {name}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">{title}</h3>
            </div>
        </div>
        <p className="text-zinc-400 mt-4 max-w-2xl leading-relaxed border-l-2 border-rose-500/40 pl-4">{tagline}</p>
    </div>
);

/* ───────────────────────────────── page ───────────────────────────────── */

const Project2 = () => {
    const project = projectsData.find(p => p.id === 2);
    const [viewerIndex, setViewerIndex] = useState(null);

    const imageIds = [10, 63, 72, 116, 180, 278, 287, 354, 610];
    const images = imageIds.map((id, idx) => ({
        beforeSrc: `/Portafolio/Project_AI_WorkFlow/antes_${id}.webp`,
        afterSrc: `/Portafolio/Project_AI_WorkFlow/despues_${id}.webp`,
        sampleLabel: `Sample #${idx + 1}`,
    }));

    return (
        <>
            {/* ─── Hero ─────────────────────────────────────────────── */}
            <header className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-10 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to work
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-10 items-end">
                        <div className="lg:col-span-6">
                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                            </div>
                            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                                The Restoration<br />
                                <span className="bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">Pipeline.</span>
                            </h1>
                            <p className="text-lg text-zinc-400 leading-relaxed mt-6 max-w-xl">
                                A three-stage ComfyUI workflow that rebuilds blurry photographs into 4K —
                                by <span className="text-zinc-200">understanding</span> the image, not guessing at it.
                            </p>

                            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10 pt-6 border-t border-white/10">
                                <Stat value="14" label="nodes" />
                                <Stat value="3" label="stages" />
                                <Stat value="4K" label="output" />
                                <Stat value="9" label="samples" />
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <Reveal>
                                <BeforeAfterSlider
                                    beforeSrc="/Portafolio/Project_AI_WorkFlow/antes_116.webp"
                                    afterSrc="/Portafolio/Project_AI_WorkFlow/despues_116.webp"
                                />
                                <p className="text-center text-xs text-zinc-600 font-mono mt-3">drag the divider — left is the raw input</p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">

                {/* ─── 01 · The Pipeline ──────────────────────────────── */}
                <section className="pt-16">
                    <SectionMarker index="01" label="The Pipeline" />

                    {/* Stage 1 */}
                    <Reveal>
                        <StageHeader index="01" name="Physical" title="Preparation & Initial Upscaling"
                            tagline="Enlarge the canvas before the AI starts thinking — pure mathematics, no generation yet." />
                        <div className="relative border-l border-zinc-800 ml-1.5 mb-16">
                            <NodeCard n={1} name="Load Image" io="→ IMAGE">
                                <p><strong className="text-zinc-200">Purpose:</strong> the entry point. The small or blurry photo is loaded here.</p>
                                <Setting><span className="font-medium text-zinc-200">image:</span> select the file from your machine.</Setting>
                            </NodeCard>
                            <NodeCard n={2} name="UpscaleModelLoader" io="→ MODEL">
                                <p><strong className="text-zinc-200">Purpose:</strong> loads the model that stretches pixels mathematically, without generative AI involved.</p>
                                <Setting><span className="font-medium text-zinc-200">model_name:</span> <K>4x-UltraSharp</K> — preserves sharpness without inventing artifacts (hallucinations).</Setting>
                            </NodeCard>
                            <NodeCard n={3} name="ImageUpscaleWithModel" io="IMAGE + MODEL → IMAGE">
                                <p><strong className="text-zinc-200">Purpose:</strong> applies 4x-UltraSharp to the original image. A 512×512 input becomes 2048×2048 (4× larger).</p>
                            </NodeCard>
                            <NodeCard n={4} name="ImageScaleToTotalPixels" io="IMAGE → IMAGE">
                                <p><strong className="text-zinc-200">Purpose:</strong> slightly downsizes the giant image to a standard resolution (2K/4K) so the GPU's VRAM is not saturated.</p>
                                <Setting label="Key settings">
                                    <p><span className="font-medium text-zinc-200">upscale_method:</span> <K>lanczos</K> — sharpest algorithm for downsampling.</p>
                                    <p><span className="font-medium text-zinc-200">megapixels:</span> <K>2.0</K> = 1080p · <K>4.0</K> = 2K · <K>8.0</K> = 4K.</p>
                                    <p><span className="font-medium text-zinc-200">resolution_steps:</span> <K>1</K> — more steps for larger inputs preserve sharpness.</p>
                                    <p className="text-xs text-zinc-500 pt-2 mt-1 border-t border-white/5">⚠ With ≤ 8 GB VRAM, keep megapixels between 2.0–4.0 to avoid Out-of-Memory errors.</p>
                                </Setting>
                            </NodeCard>
                        </div>
                    </Reveal>

                    {/* Stage 2 */}
                    <Reveal>
                        <StageHeader index="02" name="Artistic" title="Global Refinement"
                            tagline="A diffusion model (Realistic Vision) repaints the image in HD — but ControlNet keeps it on a leash, forcing it to respect the original contours." />
                        <div className="relative border-l border-zinc-800 ml-1.5 mb-16">
                            <NodeCard n={5} name="CheckpointLoaderSimple" io="→ MODEL/CLIP/VAE">
                                <p><strong className="text-zinc-200">Purpose:</strong> the creative brain of the workflow.</p>
                                <Setting><span className="font-medium text-zinc-200">ckpt_name:</span> <K>RealisticVisionV60</K> — perfect for analog, realistic photography.</Setting>
                            </NodeCard>
                            <NodeCard n={6} name="ControlNetLoader" io="→ CONTROL_NET">
                                <p><strong className="text-zinc-200">Purpose:</strong> loads the "digital police officer" that watches over the generative AI.</p>
                                <Setting><span className="font-medium text-zinc-200">control_net_name:</span> a <K>Tile</K> model — the cornerstone of the workflow. It tells the AI: "improve detail and texture, but never change the overall structure or invent new objects".</Setting>
                            </NodeCard>
                            <NodeCard n={7} name="CLIP Text Encode" io="global prompts">
                                <p><strong className="text-zinc-200">Purpose:</strong> the text directive that guides the AI's base brushstrokes across the whole image.</p>
                                <Setting label="Prompts">
                                    <p><span className="text-rose-300 font-medium">Positive:</span> high-fidelity modifiers — <K>Masterpiece, sharp focus, 8k</K>.</p>
                                    <p><span className="text-zinc-300 font-medium">Negative:</span> visual debris expelled — <K>blur, low quality, watermark</K>.</p>
                                </Setting>
                            </NodeCard>
                            <NodeCard n={8} name="VAE Encode" io="IMAGE → LATENT">
                                <p><strong className="text-zinc-200">Purpose:</strong> a zip compressor that translates your RGB pixels into <em className="text-zinc-300">latent space</em> — the native environment where diffusion models operate.</p>
                            </NodeCard>
                            <NodeCard n={9} name="ApplyControlNet" io="CONDITIONING → CONDITIONING">
                                <p><strong className="text-zinc-200">Purpose:</strong> the mixer that fuses the original image's conditioning with the strict ControlNet Tile instructions.</p>
                                <Setting><span className="font-medium text-zinc-200">strength:</span> <K>1.0</K> — forces 100% respect for the original. Lowering it sharply increases wild hallucinations.</Setting>
                            </NodeCard>
                            <NodeCard n={10} name="KSampler" io="the rendering oven" highlight>
                                <p><strong className="text-zinc-200">Purpose:</strong> the main engine. Img2Img happens here — it reads the base data, the ControlNet and the prompt, then runs iterative denoising passes until a photorealistic repaint is baked.</p>
                                <Setting label="Critical setting">
                                    <p><span className="font-medium text-zinc-200">denoise (AI creativity):</span> usually <K>0.3</K>. This makes or breaks the image:</p>
                                    <ul className="mt-1.5 space-y-1 text-xs text-zinc-400 pl-1">
                                        <li><K>0.1–0.25</K> — barely modifies textures; cleans minor flaws only.</li>
                                        <li className="text-rose-300"><K>0.3–0.4</K> — the restoration sweet spot: cleans noise yet regenerates skin grain, fabric threads, lighting.</li>
                                        <li><K>0.5+</K> — too proactive: alters identity, mutates jewelry, erases features.</li>
                                    </ul>
                                    <p className="mt-2"><span className="font-medium text-zinc-200">steps:</span> <K>25</K> · <span className="font-medium text-zinc-200">sampler:</span> <K>dpmpp_2m</K> — gold standard for non-CGI portraits.</p>
                                </Setting>
                            </NodeCard>
                            <NodeCard n={11} name="VAEDecodeTiled" io="LATENT → IMAGE">
                                <p><strong className="text-zinc-200">Purpose:</strong> the inverse of node 8 — materializes the repainted latent back into exportable RGB pixels.</p>
                                <p className="mt-2 text-zinc-500"><strong className="text-zinc-300">Why "Tiled"?</strong> A full 4K decode in one shot can exceed the VRAM bottleneck and crash. Tiled decoding renders by segments — one corner at a time — stitched into the full canvas.</p>
                            </NodeCard>
                        </div>
                    </Reveal>

                    {/* Stage 3 */}
                    <Reveal>
                        <StageHeader index="03" name="Surgical" title="The Face Surgeon"
                            tagline="Faces far from the focal point come out with strange teeth or fisheye eyes. This corrective pass detects each face, rebuilds it in its own high-res render, and stitches it back seamlessly." />
                        <div className="relative border-l border-zinc-800 ml-1.5 mb-8">
                            <NodeCard n={12} name="UltralyticsDetector + SAMLoader" io="the eyes">
                                <p><strong className="text-zinc-200">Purpose:</strong> YOLO-based segmentation modules that scan the raster to find exact face coordinates.</p>
                                <Setting>
                                    <p><span className="font-medium text-zinc-200">model_name:</span> <K>face_yolov8m</K> — draws a precise bounding box around each face.</p>
                                    <p className="mt-1"><span className="font-medium text-zinc-200">SAM:</span> converts YOLO's rectangle into a pixel-accurate facial silhouette, isolating cheeks and hair.</p>
                                </Setting>
                            </NodeCard>
                            <NodeCard n={13} name="CLIP Text Encode" io="face-only prompts">
                                <p><strong className="text-zinc-200">Purpose:</strong> text nodes wired exclusively to the FaceDetailer. They focus full attention on fine facial generation — <K>skin texture, detailed pores</K> — against negatives that prevent plastic, over-retouched skin.</p>
                            </NodeCard>
                            <NodeCard n={14} name="FaceDetailer" io="the reconstruction" highlight>
                                <p><strong className="text-zinc-200">Purpose:</strong> unifies the final reconstruction. It crops each detected face, upscales it into its own private high-res frame, re-runs Img2Img there, paints a restored face, scales the tile back down, feathers the edge, and composites it back without disturbing the original lighting. Fully automated.</p>
                                <Setting label="Vital settings">
                                    <p><span className="font-medium text-zinc-200">guide_size:</span> <K>512</K> — extrusion resolution before repainting (<K>768</K>/<K>1024</K> for close-ups).</p>
                                    <p><span className="font-medium text-zinc-200">denoise:</span> <K>0.4–0.5</K> — higher than the global stage, to rebuild lost eyes and melted teeth.</p>
                                    <p><span className="font-medium text-zinc-200">drop_size:</span> <K>10</K> — skips ultra-tiny background faces (&lt; 10px), saving compute.</p>
                                </Setting>
                            </NodeCard>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 02 · Results ───────────────────────────────────── */}
                <section className="pt-24">
                    <SectionMarker index="02" label="Results" />
                    <Reveal>
                        <p className="text-zinc-400 mb-8 max-w-2xl">
                            Nine real samples. <span className="text-rose-400">Click any pair</span> to open the side-by-side magnifier and inspect skin, fabric, and eyes at pixel level.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {imageIds.map((id, idx) => (
                                <button
                                    key={id}
                                    onClick={() => setViewerIndex(idx)}
                                    className="text-left rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/40 backdrop-blur-sm shadow-lg hover:border-rose-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group/card"
                                >
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                                        <span className="text-xs font-mono text-zinc-500">sample #{idx + 1}</span>
                                        <span className="text-xs text-zinc-600 group-hover/card:text-rose-400 transition-colors flex items-center gap-1">
                                            <Search size={12} /> compare
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-px bg-white/5">
                                        <div className="relative bg-zinc-950 overflow-hidden">
                                            <span className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase tracking-widest bg-zinc-900/80 text-zinc-400 px-2 py-0.5 rounded border border-white/10">Before</span>
                                            <img src={`/Portafolio/Project_AI_WorkFlow/antes_${id}.webp`} alt={`Before — sample ${idx + 1}`} className="w-full h-44 object-cover group-hover/card:scale-105 transition-transform duration-500" loading="lazy" />
                                        </div>
                                        <div className="relative bg-zinc-950 overflow-hidden">
                                            <span className="absolute top-2 left-2 z-10 text-[9px] font-bold uppercase tracking-widest bg-rose-500/80 text-white px-2 py-0.5 rounded border border-rose-400/30">After</span>
                                            <img src={`/Portafolio/Project_AI_WorkFlow/despues_${id}.webp`} alt={`After — sample ${idx + 1}`} className="w-full h-44 object-cover group-hover/card:scale-105 transition-transform duration-500" loading="lazy" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </section>

                {/* ─── 03 · Execution environment ─────────────────────── */}
                <section className="pt-24">
                    <SectionMarker index="03" label="Execution Environment" />
                    <Reveal>
                        <div className="rounded-2xl border border-white/8 bg-zinc-900/40 backdrop-blur-sm p-8 relative overflow-hidden">
                            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />
                            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 relative">
                                <div>
                                    <h3 className="font-display text-xl font-bold text-white">Lenovo LOQ 15IRX10</h3>
                                    <p className="text-zinc-500 text-sm mt-1 font-mono">consumer hardware · no cloud</p>
                                </div>
                                <span className="font-mono text-xs text-rose-400 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5">local inference</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                                {[
                                    { icon: Cpu, label: 'Processor', value: 'Intel Core i7 13650HX', note: '14 cores / 20 threads' },
                                    { icon: MemoryStick, label: 'Memory', value: '24 GB', note: 'DDR5' },
                                    { icon: Monitor, label: 'GPU', value: 'NVIDIA RTX 5050', note: '8 GB VRAM' },
                                ].map((spec) => {
                                    const Icon = spec.icon;
                                    return (
                                        <div key={spec.label} className="bg-zinc-950/50 rounded-xl p-5 border border-white/5 hover:border-rose-500/20 transition-colors">
                                            <Icon size={20} className="text-rose-400 mb-3" />
                                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">{spec.label}</p>
                                            <p className="text-white font-semibold mt-1">{spec.value}</p>
                                            <p className="text-zinc-500 text-xs mt-0.5">{spec.note}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ─── 04 · The complete graph ────────────────────────── */}
                <section className="pt-24">
                    <SectionMarker index="04" label="The Complete Graph" />
                    <Reveal>
                        <div className="rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/40 backdrop-blur-sm shadow-lg">
                            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                                    <Workflow size={13} className="text-rose-400" /> comfyui · full workflow
                                </span>
                                <a href="/Portafolio/Project_AI_WorkFlow/preview.webp" target="_blank" rel="noopener noreferrer"
                                    className="text-xs text-zinc-600 hover:text-rose-400 transition-colors flex items-center gap-1">
                                    <Maximize2 size={12} /> open full size
                                </a>
                            </div>
                            <a href="/Portafolio/Project_AI_WorkFlow/preview.webp" target="_blank" rel="noopener noreferrer" className="block">
                                <img src="/Portafolio/Project_AI_WorkFlow/preview.webp" alt="Full ComfyUI restoration workflow graph"
                                    className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                            </a>
                        </div>
                    </Reveal>
                </section>

                {/* ─── next ───────────────────────────────────────────── */}
                <div className="pt-20 mt-16 border-t border-white/10 flex items-center justify-between">
                    <Link to="/" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> all work
                    </Link>
                    <Link to="/project/4" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        next · data analysis <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>

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
