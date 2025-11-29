import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 md:px-12 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-accent font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-6">
            High-End Photo Retouching & Editing
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-8 leading-tight">
            Mastering the Art of <br />
            <span className="italic font-light text-text-dark">Visual Perfection</span>
          </h1>
          <p className="max-w-2xl mx-auto text-text-light text-lg md:text-xl leading-relaxed mb-12 font-light">
            I partner with elite photographers and brands to transform raw captures into editorial masterpieces.
            Specializing in color science, skin retouching, and mood enhancement to define your unique visual signature.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="#portfolio" className="btn-primary w-full md:w-auto text-center">
              View Selected Works
            </a>
            <a href="#contact" className="btn-outline w-full md:w-auto text-center">
              Request Consultation
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
