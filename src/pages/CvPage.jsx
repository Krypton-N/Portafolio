import React from 'react';
import { FileText, Download, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const CvPage = () => {
    const cvList = [
        {
            id: 1,
            title: "AI Engineer",
            language: "English",
            description: "Full resume focused on AI engineering: machine learning, computer vision, data science, and software development.",
            fileUrl: "/Portafolio/cv/CV_Noe_Rodriguez_AIEngineer_en_14-04-2026.pdf",
            lastUpdated: "April 2026"
        },
        {
            id: 2,
            title: "Ingeniero en IA",
            language: "Español",
            description: "Currículum completo enfocado en ingeniería de IA: machine learning, visión por computadora, ciencia de datos y desarrollo de software.",
            fileUrl: "/Portafolio/cv/CV_Noe_Rodriguez_AIEngineer_es_14-04-2026.pdf",
            lastUpdated: "April 2026"
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
            <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-8 transition-colors group self-start">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to home
            </Link>

            <div className="mb-12 text-center">
                <h2 className="font-display text-4xl font-bold text-white mb-4">Resume</h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Explore my professional background and skills. <br />
                    Available in English and Spanish.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                {cvList.map((cv) => (
                    <div key={cv.id} className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] hover:border-rose-500/30 transition-all duration-300 group flex flex-col">
                        <div className="p-8 flex-grow">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-500 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                                    <FileText size={32} />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${cv.language === 'English'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : 'bg-white/5 text-zinc-300 border-white/10'
                                    }`}>
                                    {cv.language}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                                {cv.title}
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                {cv.description}
                            </p>

                            <p className="text-xs text-zinc-500 font-mono">
                                Updated: {cv.lastUpdated}
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4">
                            <Button href={cv.fileUrl} variant="primary" className="flex-1 justify-center" target="_blank" rel="noopener noreferrer">
                                <Eye size={18} className="mr-2" />
                                View
                            </Button>

                            <a
                                href={cv.fileUrl}
                                download
                                className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors border border-white/5"
                                title="Download PDF"
                                aria-label={`Download ${cv.language} resume as PDF`}
                            >
                                <Download size={20} />
                            </a>

                        </div>
                    </div>
                ))}
            </div>

            {/* Hint for the user */}
            <div className="mt-16 text-center">
                <p className="text-zinc-500 text-sm">
                    Looking for something more specific? <Link to="/contact" className="text-rose-500 hover:underline">Contact me directly</Link>.
                </p>
            </div>
        </div>
    );
};

export default CvPage;
