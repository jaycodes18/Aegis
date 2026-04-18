import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor — physics-based trailing cursor with mix-blend-difference.
 * Works on top of the global `cursor: none` in index.css.
 */
const CustomCursor = memo(({ hasTremor }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      animate={{ x: pos.x - (hasTremor ? 16 : 10), y: pos.y - (hasTremor ? 16 : 10) }}
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.5 }}
    >
      <div
        className={`rounded-full bg-white transition-all duration-300 ${
          hasTremor ? 'w-8 h-8' : 'w-5 h-5'
        }`}
      />
    </motion.div>
  );
});

CustomCursor.displayName = 'CustomCursor';
export default CustomCursor;
