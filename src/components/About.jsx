import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section-padding bg-beige-dark/30">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Text Content */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-accent font-sans text-sm uppercase tracking-[0.2em] mb-4">
                            The Editor
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
                            Precision. Consistency. Artistry.
                        </h3>
                        <p className="text-text-light text-lg leading-relaxed mb-6 font-light">
                            I am Arpit Prajapati, a professional photo editor dedicated to the craft of post-production.
                            My mission is to empower photographers by handling the intricate details of editing, allowing you to focus on what you do best—creating.
                        </p>
                        <p className="text-text-light text-lg leading-relaxed mb-8 font-light">
                            With a deep understanding of color theory and a meticulous eye for detail, I provide a seamless extension to your workflow.
                            From high-volume wedding culling to pixel-perfect commercial retouching, I deliver results that elevate your brand's aesthetic and value.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mt-12">
                            <div>
                                <h4 className="text-3xl font-serif text-primary mb-2">5+</h4>
                                <p className="text-text-dark font-sans text-sm uppercase tracking-wider">Years of Excellence</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-serif text-primary mb-2">100%</h4>
                                <p className="text-text-dark font-sans text-sm uppercase tracking-wider">Client Retention</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image/Visual Placeholder */}
                    <motion.div
                        className="md:w-1/2 relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="aspect-[4/5] bg-primary/10 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 border-[1px] border-primary/20 m-4"></div>
                            <div className="text-center p-8">
                                <span className="font-serif text-6xl text-primary/20 block mb-4">"</span>
                                <p className="font-serif text-xl text-primary/60 italic">
                                    Editing is not just about correcting mistakes; it's about revealing the hidden potential of every image.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
