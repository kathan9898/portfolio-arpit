import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h4 className="font-serif text-2xl font-bold mb-2 text-white">Arpit Prajapati</h4>
                        <p className="text-white/60 font-light text-sm">Professional Photo Editor & Retoucher</p>
                    </div>

                    <div className="flex space-x-8 mb-6 md:mb-0">
                        <a href="https://instagram.com/p_arpit4423" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Instagram</a>
                        <a href="mailto:prajapatiarpit704@gmail.com" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">Email</a>
                        <a href="https://wa.me/916352461286" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider">WhatsApp</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/40 text-xs">
                    © {new Date().getFullYear()} Arpit Prajapati. All rights reserved.
                </p>
                <p className="text-white/40 text-xs mt-2 md:mt-0">
                    Designed with precision.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
