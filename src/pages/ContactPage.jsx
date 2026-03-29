import React from 'react';
import { MessageCircle, Mail, Linkedin, Github } from 'lucide-react';

import contactData from '../data/contact.json';

const iconMap = {
    MessageCircle,
    Mail,
    Linkedin,
    Github
};

const ContactPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Contact Me</h2>
                <p className="text-zinc-400 text-lg">Let's start a conversation</p>
            </div>

            <div className="w-full max-w-2xl bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-md shadow-2xl p-8">
                <p className="text-zinc-400 text-center mb-8 text-lg">
                    Have a project in mind or want to collaborate? <br />
                    Choose your preferred channel to get in touch.
                </p>

                <div className="space-y-4">
                    {contactData.map((item) => {
                        const Icon = iconMap[item.icon] || Mail;

                        return (
                            <a
                                key={item.id}
                                href={item.url}
                                target={item.id === 'email' ? '_self' : '_blank'}
                                rel="noopener noreferrer"
                                className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(225,29,72,0.15)] transition-all duration-300 group"
                            >
                                <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
                                    <Icon size={24} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg group-hover:text-rose-400 transition-colors">
                                        {item.platform}
                                    </h3>
                                    <p className="text-zinc-400 text-sm font-medium">
                                        {item.display}
                                    </p>
                                </div>

                                <div className="hidden sm:block text-zinc-600 group-hover:translate-x-1 group-hover:text-rose-500 transition-all text-xl">
                                    →
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
