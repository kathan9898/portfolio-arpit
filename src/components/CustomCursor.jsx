import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setCursorVariant("hover");
    const mouseLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);

    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll('a, button, .gallery-image-card, .collection-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
      mixBlendMode: "difference"
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2,
      backgroundColor: "rgba(135, 169, 107, 0.8)",
      mixBlendMode: "normal"
    }
  };

  const followerVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0
    }
  };

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      <motion.div
        className="cursor-follower"
        variants={followerVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      />
    </>
  );
};

export default CustomCursor;
