import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        title: "Advanced Color Grading",
        description: "Creating bespoke color profiles that define your brand's mood. From airy pastels to moody cinematic tones, ensuring consistency across every shot.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        )
    },
    {
        title: "High-End Beauty Retouching",
        description: "Non-destructive Dodge & Burn, Frequency Separation, and skin texture preservation for flawless, magazine-quality portraits.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        )
    },
    {
        title: "Editorial & Commercial",
        description: "Detailed background cleanup, object removal, and composite work for fashion lookbooks, product campaigns, and editorial spreads.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Wedding Workflow Management",
        description: "Comprehensive culling, exposure correction, and white balance synchronization for thousands of images, delivered with speed.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    }
];

const Services = () => {
    return (
        <section id="services" className="section-padding">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-accent font-sans text-sm uppercase tracking-[0.2em] mb-4">
                        Expertise
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                        Technical Precision
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/50 p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-primary mb-6 opacity-80">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-serif font-bold text-primary mb-4">
                                {service.title}
                            </h4>
                            <p className="text-text-light font-light leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
