import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collections, collectionThemes, fallbackImage } from '../assets/images/placeholder-generator.js';

// Professional Photography Services Data
const photographyServices = {
  portrait: {
    title: "Portrait Photography",
    description: "Capturing authentic expressions and timeless personalities",
    features: ["Professional Studio Setup", "Natural Light Mastery", "Retouching Included"],
    startingPrice: "Starting at ₹15,000",
    duration: "2-4 hours",
    deliverables: "30-50 edited photos",
    popular: true,
    images: collections['Haldi'] || [fallbackImage, fallbackImage, fallbackImage]
  },
  wedding: {
    title: "Wedding Photography",
    description: "Your love story told through cinematic moments",
    features: ["Full Day Coverage", "Candid + Posed Shots", "Quick Preview Delivery"],
    startingPrice: "Starting at ₹80,000",
    duration: "8-12 hours",
    deliverables: "500+ edited photos",
    popular: false,
    images: collections['Candid'] || [fallbackImage, fallbackImage, fallbackImage]
  },
  commercial: {
    title: "Commercial & Brand",
    description: "Elevating your brand with compelling visual narratives",
    features: ["Brand Strategy Session", "Multiple Concepts", "Commercial Rights"],
    startingPrice: "Starting at ₹25,000",
    duration: "4-8 hours",
    deliverables: "50-100 edited photos",
    popular: false,
    images: collections['Lagan'] || [fallbackImage, fallbackImage, fallbackImage]
  },
  events: {
    title: "Event Photography",
    description: "Preserving the energy and emotions of your special moments",
    features: ["Live Event Coverage", "Discrete Photography", "Same Day Highlights"],
    startingPrice: "Starting at ₹20,000",
    duration: "4-6 hours",
    deliverables: "200-300 edited photos",
    popular: false,
    images: collections['Haldi'] || [fallbackImage, fallbackImage, fallbackImage]
  }
};

const ServiceShowcase = ({ serviceKey, service, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate showcase images with enhanced animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setDirection(1);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % service.images.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }, 5000 + index * 500); // Stagger the rotation

    return () => clearInterval(interval);
  }, [service.images.length, index]);

  // Handle manual thumbnail clicks
  const handleThumbnailClick = (imgIndex) => {
    if (imgIndex === currentImageIndex) return;
    
    setIsTransitioning(true);
    setDirection(imgIndex > currentImageIndex ? 1 : -1);
    setTimeout(() => {
      setCurrentImageIndex(imgIndex);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const handleImageError = (imgIndex) => {
    setImageErrors(prev => ({ ...prev, [imgIndex]: true }));
  };

  const getImageSrc = (image, imgIndex) => {
    return imageErrors[imgIndex] ? fallbackImage : image;
  };

  return (
    <motion.div
      className="service-showcase-card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
    >
      {service.popular && (
        <motion.div 
          className="popular-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          Most Popular
        </motion.div>
      )}

      {/* Image Showcase */}
      <div className="service-image-showcase">
        <div className="showcase-main-image">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={getImageSrc(service.images[currentImageIndex], currentImageIndex)}
              alt={`${service.title} showcase`}
              onError={() => handleImageError(currentImageIndex)}
              initial={{ 
                opacity: 0, 
                scale: 1.1,
                x: direction > 0 ? 100 : -100,
                rotateY: direction > 0 ? 15 : -15
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: 0,
                rotateY: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                x: direction > 0 ? -100 : 100,
                rotateY: direction > 0 ? -15 : 15
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              loading="lazy"
              style={{
                filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
                transition: 'filter 0.3s ease'
              }}
            />
          </AnimatePresence>
          <motion.div 
            className="image-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="image-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: "linear" }}
              key={`progress-${currentImageIndex}`}
            />
          </motion.div>
        </div>
        
        <div className="showcase-thumbnails">
          <div className="thumbnails-scrollable">
            {service.images.map((image, imgIndex) => (
              <motion.button
                key={imgIndex}
                className={`thumbnail ${imgIndex === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(imgIndex)}
                whileHover={{ 
                  scale: 1.15,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: imgIndex * 0.1, duration: 0.5 }}
              >
                <motion.img
                  src={getImageSrc(image, imgIndex)}
                  alt={`${service.title} ${imgIndex + 1}`}
                  onError={() => handleImageError(imgIndex)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                {imgIndex === currentImageIndex && (
                  <motion.div
                    className="thumbnail-indicator"
                    layoutId={`indicator-${serviceKey}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Scroll indicators */}
          <div className="scroll-indicators">
            <motion.button 
              className="scroll-btn scroll-left"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const container = document.querySelector('.thumbnails-scrollable');
                container?.scrollBy({ left: -120, behavior: 'smooth' });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </motion.button>
            <motion.button 
              className="scroll-btn scroll-right"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const container = document.querySelector('.thumbnails-scrollable');
                container?.scrollBy({ left: 120, behavior: 'smooth' });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="service-details">
        <div className="service-header">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
        </div>

        <div className="service-features">
          {service.features.map((feature, fIndex) => (
            <motion.div
              key={fIndex}
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + fIndex * 0.1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="service-info-grid">
          <div className="info-item">
            <span className="info-label">Duration</span>
            <span className="info-value">{service.duration}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Deliverables</span>
            <span className="info-value">{service.deliverables}</span>
          </div>
        </div>

        <div className="service-footer">
          <div className="pricing">
            <span className="price">{service.startingPrice}</span>
            <span className="price-note">*Customizable packages available</span>
          </div>
          
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to contact section
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Book Session</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Collections = ({ currentTheme, onThemeChange }) => {
  const serviceKeys = Object.keys(photographyServices);

  return (
    <section id="work" className="collections-section section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Photography Services</h2>
          <p className="section-subtitle">
            Professional photography tailored to capture your vision with artistic excellence
          </p>
          <motion.div
            className="section-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2000+</span>
              <span className="stat-label">Photos Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="services-showcase-grid">
          {serviceKeys.map((serviceKey, index) => (
            <ServiceShowcase
              key={serviceKey}
              serviceKey={serviceKey}
              service={photographyServices[serviceKey]}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action Section */}
        <motion.div
          className="services-cta-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h3>Ready to Create Something Amazing?</h3>
            <p>Let's discuss your vision and create a customized photography package that exceeds your expectations.</p>
            <div className="cta-buttons">
              <motion.button
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                className="cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Portfolio
              </motion.button>
            </div>
          </div>
          <div className="cta-features">
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ marginLeft: '20px' }}>Rapid Photo Edits</span>
            </div>
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
              </svg>
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
              <span>Professional Editing Included</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
