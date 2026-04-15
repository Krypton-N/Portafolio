import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Noe Rodriguez. Built with React & Tailwind.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/Krypton-N" className="text-zinc-500 hover:text-rose-400 transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/noe-rodriguez-ai/"
                        className="text-zinc-500 hover:text-rose-400 transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:[rodriguez.flor.alannoe@gmail.com]" className="text-zinc-500 hover:text-rose-400 transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
