import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';

// ──────────────────────────────────────────────
// Certificate Data (from Descripciones_certificados.md)
// ──────────────────────────────────────────────
const certificates = [
    {
        id: 1,
        file: '/images/Page_CertificationsAssets/DevConIA.png',
        title: 'Iniciación al Desarrollo con IA',
        issuer: 'BIG school — Romuald Fons & Brais Moure',
        date: 'Marzo 2026 · 6 horas',
        description: "Certificado obtenido tras completar las jornadas formativas 'Desarrollo con IA: de 0 a Producción'. Durante este programa intensivo, me especialicé en el desarrollo e implementación de agentes de IA para construir sistemas complejos y completos, abarcando todo el ciclo de vida desde cero hasta su despliegue en producción. Comprender el alcance y la autonomía de estas herramientas me ha impulsado a planificar una futura certificación en ciberseguridad, con el firme objetivo de mitigar riesgos, proteger los datos y garantizar la seguridad del usuario al operar agentes de IA con altos niveles de privilegios.",
        keywords: 'Inteligencia Artificial · Agentes de IA · Desarrollo de Software · Puesta en Producción · Ciberseguridad (Planificación) · Sistemas Complejos',
    },
    {
        id: 2,
        file: '/images/Page_CertificationsAssets/Kickoff-BadgeAgile.png',
        title: 'PMI KICKOFF Badge — Agile',
        issuer: 'Project Management Institute (PMI)',
        date: '2025',
        description: "Insignia oficial otorgada por el Project Management Institute (PMI) que acredita la finalización del programa KICKOFF en la rama Ágil. Esta credencial demuestra mi comprensión y aplicación práctica de los principios y marcos de trabajo ágiles (como Scrum y Kanban). Valida mi capacidad para adaptarme a entornos dinámicos, fomentar la colaboración efectiva dentro del equipo y centrarme en la entrega de valor de manera iterativa y continua para el cliente.",
        keywords: 'Metodologías Ágiles · Scrum · Kanban · Adaptabilidad · Mejora Continua · Trabajo en Equipo',
    },
    {
        id: 3,
        file: '/images/Page_CertificationsAssets/Kickoff-Badge-predictive Methodology.png',
        title: 'PMI KICKOFF Badge — Predictive',
        issuer: 'Project Management Institute (PMI)',
        date: '2025',
        description: "Insignia oficial otorgada por el Project Management Institute (PMI) correspondiente al programa KICKOFF en la rama Predictiva (Waterfall o Cascada). Esta credencial respalda mi conocimiento en enfoques tradicionales de gestión de proyectos. Destaca mis habilidades para la planificación estructurada, la definición clara de alcances (Scope), la gestión de riesgos y la ejecución secuencial, asegurando el cumplimiento de los objetivos del proyecto en tiempo, costo y forma.",
        keywords: 'Gestión de Proyectos (Predictivo/Waterfall) · Planificación Estratégica · Gestión de Riesgos · Control de Alcance',
    },
    {
        id: 4,
        file: '/images/Page_CertificationsAssets/Project Managment & Agile Fundamentals.png',
        title: 'Project Management & Agile Fundamentals',
        issuer: 'Santander Open Academy',
        date: 'Agosto 2025 · 8 horas',
        description: "Certificación integral que consolida mi dominio en la gestión de proyectos y la innovación de productos frente a entornos volátiles (VUCA/BANI). Esta formación me brindó la capacidad de integrar estratégicamente tres marcos fundamentales: utilizo Design Thinking (5 fases) para empatizar con el usuario e idear soluciones; aplico Lean Startup para validar hipótesis rápidamente mediante un Producto Mínimo Viable (MVP) y el ciclo Build-Measure-Learn ('fail fast, fail cheap'); y ejecuto la construcción iterativa a través de Scrum, dominando sus roles, eventos y artefactos. Esta sinergia me permite asegurar que no solo construimos el producto correctamente, sino que construimos el producto correcto.",
        keywords: 'Metodologías Ágiles · Scrum Framework · Design Thinking · Lean Startup · MVP · Desarrollo Iterativo-Incremental · Innovación Centrada en el Usuario',
    },
    {
        id: 5,
        file: null,
        title: 'Fundamentals of Deep Learning',
        issuer: 'NVIDIA Deep Learning Institute (DLI)',
        date: 'Noviembre 2025 – Enero 2026',
        description: "Programa técnico a través del NVIDIA Deep Learning Institute. Durante esta formación, adquirí experiencia práctica y profunda en la arquitectura e implementación de redes neuronales, enfocándome en resolver problemas reales de Visión por Computadora (Computer Vision) y Procesamiento de Lenguaje Natural (NLP). Desarrollé habilidades críticas en la optimización del rendimiento de los modelos, dominando el uso de diversas funciones de activación (ReLU, Sigmoid, Linear) y aplicando técnicas avanzadas para garantizar la generalización ante datos nuevos, tales como el control de Overfitting mediante Dropout y el robustecimiento de datos a través de Data Augmentation.",
        keywords: 'Deep Learning · Redes Neuronales · Computer Vision · NLP · Optimización de Modelos · Data Augmentation · Prevención de Overfitting · NVIDIA DLI',
    },
];

// ──────────────────────────────────────────────
// Timeline Data — solo formación académica
// ──────────────────────────────────────────────
const timelineItems = [
    {
        id: 1,
        title: 'Ingeniería en Inteligencia Artificial',
        date: 'Presente',
        institution: 'Escuela Superior de Computo (ESCOM) IPN',
        description:
            'Desarrollando soluciones de visión por computadora y automatización de procesos complejos.',
        isCurrent: true,
    },
    {
        id: 2,
        title: 'Técnico en Programación',
        date: '2020 – 2024',
        institution: 'Centro de Estudios Científicos y Tecnológicos No. 9 "Juan de Dios Batíz" (CECyT9) IPN',
        description:
            'Formación intensiva en estructuras de datos, algoritmos y desarrollo de software robusto.',
        isCurrent: false,
    },
];

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────
const TimelineItem = ({ item }) => (
    <div className="mb-8 ml-8 relative group">
        <span
            className={`absolute -left-[41px] top-0 h-5 w-5 rounded-full border-2 bg-zinc-900 transition-colors duration-300 ${
                item.isCurrent
                    ? 'border-rose-500 group-hover:bg-rose-500'
                    : 'border-zinc-600 group-hover:border-rose-500'
            }`}
        />
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <span className="text-sm text-zinc-400 font-mono">{item.date}</span>
        <span className="text-m text-rose-400 font-mono block">{item.institution}</span>
        <p className="mt-2 text-zinc-400">{item.description}</p>
    </div>
);

// ──────────────────────────────────────────────
// Lightbox
// ──────────────────────────────────────────────
const Lightbox = ({ src, alt, onClose }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
            style={{ animation: 'fadeIn 200ms ease' }}
            onClick={onClose}
        >
            <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-rose-500/30 transition-all"
                aria-label="Cerrar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Image */}
            <img
                src={src}
                alt={alt}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[90vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl"
                style={{ animation: 'scaleIn 250ms cubic-bezier(0.34,1.56,0.64,1)' }}
            />
            <style>{`@keyframes scaleIn { from { transform: scale(0.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>
        </div>
    );
};

const CertificateCard = ({ cert, onImageClick }) => (
    <div
        className="
            group flex flex-col sm:flex-row gap-0 rounded-3xl overflow-hidden
            border border-white/5 bg-zinc-900/40 backdrop-blur-md
            shadow-lg relative
            hover:scale-[1.05] hover:shadow-[0_8px_40px_rgba(225,29,72,0.25)] hover:border-rose-500/30
            hover:z-10
        "
        style={{ transition: 'transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease' }}
    >
        {/* Certificate Image or Placeholder */}
        <div className="sm:w-1/2 bg-zinc-800/60 flex items-center justify-center p-4 min-h-[200px]">
            {cert.file ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={cert.file}
                        alt={cert.title}
                        onClick={() => onImageClick(cert.file, cert.title)}
                        className="w-full h-full object-contain max-h-60 sm:max-h-72 rounded-xl cursor-zoom-in"
                        loading="lazy"
                    />
                    {/* Zoom hint */}
                    <div
                        onClick={() => onImageClick(cert.file, cert.title)}
                        className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-zoom-in"
                    >
                        <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            Ver en grande
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-center px-6">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                    <p className="text-zinc-500 text-sm font-mono">Certificado Digital</p>
                </div>
            )}
        </div>

        {/* Description */}
        <div className="sm:w-1/2 p-6 flex flex-col justify-center gap-4">
            <div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                    {cert.title}
                </h3>
                <p className="text-rose-400 font-mono text-sm mt-0.5">{cert.issuer}</p>
                <p className="text-zinc-500 font-mono text-xs mt-0.5">{cert.date}</p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">{cert.description}</p>

            <p className="text-xs text-zinc-600 font-mono border-t border-white/5 pt-3 leading-relaxed">
                <span className="text-rose-500/70">skills: </span>{cert.keywords}
            </p>
        </div>
    </div>
);


// ──────────────────────────────────────────────
// Formation Page
// ──────────────────────────────────────────────
const FormationPage = () => {
    const [lightbox, setLightbox] = useState(null); // { src, alt }

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="min-h-screen pt-24 pb-20">

            {/* Lightbox modal */}
            {lightbox && (
                <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
            )}

            {/* Back link */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-zinc-400 hover:text-rose-400 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al inicio
                </Link>
            </div>

            {/* ── Section 1: Timeline ────────────────────── */}
            <section className="py-12 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Mi Trayectoria" subtitle="Timeline" />
                    <div className="max-w-3xl mx-auto border-l-2 border-zinc-700 ml-4 md:ml-auto">
                        {timelineItems.map((item) => (
                            <TimelineItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 2: Certificate Gallery ─────────── */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Certificaciones" subtitle="Gallery" />

                    <div className="flex flex-col gap-8">
                        {certificates.map((cert) => (
                            <CertificateCard key={cert.id} cert={cert} onImageClick={openLightbox} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FormationPage;
