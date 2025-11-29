import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const BeforeAfterSlider = ({ beforeImage, afterImage, title, category }) => {
    const [sliderPosition, setSliderPosition] = useState(30); // Start slightly revealing before
    const [isDragging, setIsDragging] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    // Automated Animation
    useEffect(() => {
        if (isInView && !hasInteracted) {
            // Wait 1s then animate
            const startDelay = setTimeout(() => {
                let start = null;
                const duration = 1500; // 1.5s for the sweep
                const initialPos = 30;
                const targetPos = 100; // Reveal full after image

                const animate = (timestamp) => {
                    if (hasInteracted) return; // Stop if user touched it
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);

                    // Ease out cubic
                    const ease = 1 - Math.pow(1 - percentage, 3);

                    const currentPos = initialPos + (targetPos - initialPos) * ease;
                    setSliderPosition(currentPos);

                    if (progress < duration) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }, 1000);

            return () => clearTimeout(startDelay);
        }
    }, [isInView, hasInteracted]);

    const handleMove = (event) => {
        if (!containerRef.current) return;
        setHasInteracted(true); // Stop auto animation

        const containerRect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

        let position = ((clientX - containerRect.left) / containerRect.width) * 100;
        position = Math.max(0, Math.min(100, position));

        setSliderPosition(position);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
        setHasInteracted(true);
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden group select-none cursor-ew-resize rounded-lg shadow-2xl">
            <div
                ref={containerRef}
                className="relative w-full h-full"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={handleMove}
            >
                {/* After Image (Background - The Edited Result) */}
                <img
                    src={afterImage}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                />
                <div className="absolute top-6 right-6 bg-primary/90 text-white text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-sm z-10 shadow-lg backdrop-blur-sm">
                    After
                </div>

                {/* Before Image (Foreground - Clipped - The Raw Shot) */}
                <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={beforeImage}
                        alt="Before"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable="false"
                    />
                    <div className="absolute top-6 left-6 bg-black/70 text-white text-xs font-sans uppercase tracking-widest px-4 py-2 rounded-sm z-10 shadow-lg backdrop-blur-sm">
                        Before
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transform transition-transform hover:scale-110">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Info Overlay - Always visible at bottom for context */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 pt-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2 font-bold">{category}</p>
                    <h3 className="text-white font-serif text-2xl md:text-3xl">{title}</h3>
                </motion.div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
