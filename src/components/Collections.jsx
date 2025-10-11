import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collections, collectionThemes, fallbackImage } from '../assets/images/placeholder-generator.js';

const ModernGallery = ({ images, theme, isVisible }) => {
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6;

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (image, index) => {
    return imageErrors[index] ? fallbackImage : image;
  };

  // Auto-pagination for images if more than 6
  useEffect(() => {
    if (!isVisible || images.length <= imagesPerPage) return;

    let autoPageInterval;
    const totalPages = Math.ceil(images.length / imagesPerPage);

    const startAutoPagination = () => {
      autoPageInterval = setInterval(() => {
        setCurrentPage(prev => (prev + 1) % totalPages);
      }, 4000);
    };

    if (!showAll) {
      startAutoPagination();
    }

    return () => {
      clearInterval(autoPageInterval);
    };
  }, [isVisible, images.length, imagesPerPage, showAll]);

  const getCurrentImages = () => {
    if (showAll) {
      return images;
    }
    const startIndex = currentPage * imagesPerPage;
    return images.slice(startIndex, startIndex + imagesPerPage);
  };

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = getCurrentImages();

  return (
    <div className="modern-gallery-grid">
      <div className="gallery-images">
        {currentImages.map((image, index) => {
          const actualIndex = showAll ? index : (currentPage * imagesPerPage) + index;
          return (
            <motion.div
              key={`${actualIndex}-${currentPage}`}
              className="gallery-image-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ delay: (index % imagesPerPage) * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
              layout
            >
              <div className="image-wrapper">
                <img
                  src={getImageSrc(image, actualIndex)}
                  alt={`${theme.name} ${actualIndex + 1}`}
                  onError={() => handleImageError(actualIndex)}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="image-index">{actualIndex + 1}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {images.length > imagesPerPage && (
        <div className="gallery-controls">
          {!showAll && totalPages > 1 && (
            <div className="pagination-dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`pagination-dot ${i === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
          
          <motion.button
            className="show-all-button"
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{showAll ? 'Show Less' : `View All ${images.length} Images`}</span>
            <motion.div
              className="button-arrow"
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
};

const CollectionCard = ({ collection, theme, isExpanded, onToggle, onThemeChange }) => {
  const [imageErrors, setImageErrors] = useState({});
  const images = collections[collection];

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (image, index) => {
    return imageErrors[index] ? fallbackImage : image;
  };

  const handleExpand = () => {
    onThemeChange(collection);
    onToggle(collection);
  };

  return (
    <motion.div 
      className="modern-collection-card"
      layout
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Collection Header */}
      <motion.div 
        className="collection-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="collection-meta">
          <span className="collection-number">{collection.padStart(2, '0')}</span>
          <div className="collection-info">
            <h3 className="collection-title">{theme.name}</h3>
            <p className="collection-description">{theme.description}</p>
          </div>
        </div>
        
        <motion.button
          className="expand-button"
          onClick={handleExpand}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isExpanded ? 'Show Less' : 'Explore Collection'}</span>
          <motion.div
            className="button-icon"
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className="hero-image-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <img 
          src={getImageSrc(images[0], 0)} 
          alt={`${theme.name} hero`}
          onError={() => handleImageError(0)}
          loading="lazy"
        />
        <div className="hero-overlay">
          <div className="image-count">
            <span>{images.length} Images</span>
          </div>
        </div>
      </motion.div>

      {/* Modern Gallery - Horizontal Scroll */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="modern-gallery-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="gallery-header">
              <h4 className="gallery-title">Complete Collection</h4>
              <p className="gallery-subtitle">Auto-rotating showcase • {images.length} stunning captures</p>
            </div>
            
            <ModernGallery 
              images={images} 
              theme={theme} 
              isVisible={isExpanded} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Collections = ({ currentTheme, onThemeChange }) => {
  const [expandedCollection, setExpandedCollection] = useState(null);
  const collectionKeys = Object.keys(collections);

  const handleToggleCollection = (collection) => {
    setExpandedCollection(expandedCollection === collection ? null : collection);
  };

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
          <h2 className="section-title">Collections</h2>
          <p className="section-subtitle">
            Each story captured with intention, every moment preserved with artistry
          </p>
        </motion.div>

        <div className="modern-collections-grid">
          {collectionKeys.map((collection, index) => (
            <motion.div
              key={collection}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <CollectionCard
                collection={collection}
                theme={collectionThemes[collection]}
                isExpanded={expandedCollection === collection}
                onToggle={handleToggleCollection}
                onThemeChange={onThemeChange}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
