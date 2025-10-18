import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
              </svg>
              Visual Storyteller
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              data-text="Arpit"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Arpit
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Portrait & Cinematic Photographer
            </motion.p>
            
            <motion.p 
              className="hero-mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              I see beauty in the fleeting moments, crafting visual poetry from life's most precious chapters.
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a href="#work" className="cta-button">
                <span>Explore My Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Portrait */}
          <motion.div 
            className="hero-portrait"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          >
            <div className="portrait-container">
              {/* Background Elements */}
              <motion.div 
                className="portrait-bg-shapes"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 0.95, 1] 
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
              </motion.div>

              {/* Main Portrait Frame */}
              <motion.div 
                className="portrait-main-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="portrait-image-container">
                  <img 
                    src="/me.png" 
                    alt="Arpit - Portrait & Cinematic Photographer"
                    className="portrait-image"
                  />
                  <div className="portrait-overlay"></div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="floating-element element-1"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              </motion.div>

              <motion.div 
                className="floating-element element-2"
                animate={{ 
                  y: [0, 8, 0],
                  x: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1 
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </motion.div>

              <motion.div 
                className="floating-element element-3"
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <div className="element-dot"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
