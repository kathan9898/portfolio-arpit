import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

// Portfolio configuration - Update this array with your image filenames
const portfolioItems = [
    {
        id: 1,
        category: "Wedding",
        title: "Cinematic Color Grading",
        filename: "1.jpg" // Place matching images in public/portfolio/before/1.jpg and public/portfolio/after/1.jpg
    },
    {
        id: 2,
        category: "Editorial",
        title: "High-End Retouching",
        filename: "2.jpg"
    },
    {
        id: 3,
        category: "Portrait",
        title: "Skin Texture & Tone",
        filename: "3.jpg"
    },
    {
        id: 4,
        category: "Commercial",
        title: "Product Cleanup",
        filename: "4.jpg"
    },
];

const Portfolio = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    };

    const currentItem = portfolioItems[currentIndex];
    const beforeImage = `/portfolio/before/${currentItem.filename}`;
    const afterImage = `/portfolio/after/${currentItem.filename}`;

    return (
        <section id="portfolio" className="section-padding bg-beige-dark/30 min-h-screen flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-accent font-sans text-sm uppercase tracking-[0.2em] mb-4">
                        Portfolio
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                        The Editing Difference
                    </h3>
                    <p className="text-text-light text-lg font-light max-w-2xl mx-auto">
                        Experience the transformation. Interactive comparisons showcasing precision and artistry.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Main Slider Area */}
                    <div className="relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BeforeAfterSlider
                                    beforeImage={beforeImage}
                                    afterImage={afterImage}
                                    title={currentItem.title}
                                    category={currentItem.category}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-between items-center mt-8 px-4 md:px-0">
                        <button
                            onClick={prevSlide}
                            className="group flex items-center gap-3 text-primary hover:text-accent transition-colors"
                        >
                            <div className="w-12 h-12 border border-primary/20 rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <span className="font-sans text-sm uppercase tracking-widest hidden md:block">Previous</span>
                        </button>

                        <div className="flex gap-2">
                            {portfolioItems.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-8' : 'bg-primary/20 hover:bg-primary/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="group flex items-center gap-3 text-primary hover:text-accent transition-colors"
                        >
                            <span className="font-sans text-sm uppercase tracking-widest hidden md:block">Next Project</span>
                            <div className="w-12 h-12 border border-primary/20 rounded-full flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
