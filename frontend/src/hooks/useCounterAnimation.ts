'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para animar un contador desde 0 hasta un valor objetivo
 * @param target - Valor objetivo del contador
 * @param duration - Duración de la animación en milisegundos (default: 2500ms)
 * @param delay - Retraso antes de iniciar la animación (default: 800ms)
 * @returns Objeto con el valor actual del contador y si está animando
 */
export const useCounterAnimation = (
  target: number, 
  duration: number = 2500, 
  delay: number = 800
): { value: number; isAnimating: boolean } => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (target === 0) {
      setCurrent(0);
      setIsAnimating(false);
      return;
    }

    const startTime = Date.now() + delay;
    setIsAnimating(true);
    
    const timer = setInterval(() => {
      const now = Date.now();
      
      if (now < startTime) {
        return; // Esperar el delay
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de easing cúbica para un efecto más natural
      // Rápido al inicio, lento al final
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const newValue = Math.round(target * easedProgress);
      
      setCurrent(newValue);

      if (progress >= 1) {
        clearInterval(timer);
        setCurrent(target); // Asegurar el valor final exacto
        setIsAnimating(false);
      }
    }, 16); // ~60 FPS

    return () => {
      clearInterval(timer);
      setIsAnimating(false);
    };
  }, [target, duration, delay]);

  return { value: current, isAnimating };
};
