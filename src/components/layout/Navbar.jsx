import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleNavClick = (e, path) => {
        setIsMobileMenuOpen(false);
        if (path.startsWith('/#')) {
            const id = path.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', path);
            }
        }
    };

    const navLinks = [
        { name: 'Inicio', path: '/#inicio' },
        { name: 'Proyectos', path: '/#proyectos' },
        { name: 'Mi Formación', path: '/formacion' },
        { name: 'Contacto', path: '/contact' },
        { name: 'CV', path: '/cv' },
    ];


    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 transition-all duration-500 ${isScrolled ? 'bg-black/40 backdrop-blur-2xl shadow-[0_0_20px_rgba(225,29,72,0.2)] border border-white/10' : 'bg-black/20 backdrop-blur-lg border border-white/5'
            } rounded-full py-3 px-6`}>
            <div className="flex items-center justify-between">
                <Link to="/Portafolio/" className="text-xl font-bold bg-gradient-to-r from-zinc-100 to-rose-200 bg-clip-text text-transparent hover:to-rose-400 transition-colors">
                    Portafolio
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={(e) => handleNavClick(e, link.path)}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                        </Link>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="https://github.com/Krypton-N" className="text-zinc-400 hover:text-white transition-colors hover:scale-110 duration-200"><Github size={18} /></a>
                    <a href="https://www.linkedin.com/in/noe-rodriguez-ai/" className="text-zinc-400 hover:text-white transition-colors hover:scale-110 duration-200"><Linkedin size={18} /></a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-zinc-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col gap-4 md:hidden shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-zinc-300 hover:text-white text-lg py-2 border-b border-white/5 hover:text-rose-400"
                            onClick={(e) => handleNavClick(e, link.path)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex gap-6 mt-4 justify-center">
                        <a href="https://github.com/Krypton-N" className="text-zinc-400 hover:text-rose-400"><Github size={24} /></a>
                        <a href="https://www.linkedin.com/in/noe-rodriguez-ai/" className="text-zinc-400 hover:text-rose-400"><Linkedin size={24} /></a>
                    </div>
                </div>
            )}
        </nav>
    );
};




export default Navbar;
