import { useState, useEffect, useCallback } from 'react';

/**
 * useTremor — detects erratic mouse movement (rapid direction reversals)
 * and exposes a manual override toggle so the user can turn accessibility
 * mode on or off at any time regardless of mouse state.
 *
 * @param {number} threshold  — direction reversals per 2s window to auto-trigger (default: 15)
 * @returns {{ hasTremor: boolean, toggle: () => void, reset: () => void }}
 */
export function useTremor(threshold = 15) {
  // manualOverride: null = follow mouse detection, true = forced on, false = forced off
  const [manualOverride, setManualOverride] = useState(null);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    let lastX = 0;
    let lastDirection = null;
    let directionChanges = 0;

    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const movingRight = currentX > lastX;

      if (lastDirection !== null && lastDirection !== movingRight) {
        directionChanges++;
      }

      lastDirection = movingRight;
      lastX = currentX;

      if (directionChanges > threshold) {
        setDetected(true);
      }
    };

    // Reset jitter count every 2 seconds — requires sustained shaking
    const resetInterval = setInterval(() => {
      directionChanges = 0;
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(resetInterval);
    };
  }, [threshold]);

  // The resolved value: manual override wins if set, otherwise use detection
  const hasTremor = manualOverride !== null ? manualOverride : detected;

  // Toggle: if currently on (for any reason), turn it explicitly off; if off, turn on
  const toggle = useCallback(() => {
    setManualOverride((prev) => {
      const current = prev !== null ? prev : detected;
      return !current;
    });
  }, [detected]);

  // Full reset: clear both manual override and detection
  const reset = useCallback(() => {
    setManualOverride(null);
    setDetected(false);
  }, []);

  return { hasTremor, toggle, reset };
}
