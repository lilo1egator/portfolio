import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const PARTICLE_LIFETIME = 600; // ms
const PARTICLE_COUNT = 3; // менше частинок за рух
const PARTICLE_LIMIT = 120; // максимум частинок у стані

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const particlesRef = useRef([]);
  const particlesContainerRef = useRef(null);
  const animationFrame = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      // Додаємо частинки
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (particlesRef.current.length >= PARTICLE_LIMIT) {
          // Видаляємо найстарішу
          const old = particlesRef.current.shift();
          if (old && old.el && old.el.parentNode) old.el.parentNode.removeChild(old.el);
        }
        const el = document.createElement('div');
        el.className = 'cursor-particle';
        const size = randomBetween(4, 8);
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
        el.style.opacity = '1';
        el.style.position = 'fixed';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '2147483646';
        if (particlesContainerRef.current) {
          particlesContainerRef.current.appendChild(el);
        }
        particlesRef.current.push({
          el,
          x: e.clientX,
          y: e.clientY,
          dx: randomBetween(-2, 2),
          dy: randomBetween(-2, 2),
          size,
          created: Date.now(),
        });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    function animate() {
      const now = Date.now();
      particlesRef.current = particlesRef.current.filter((p) => {
        const life = (now - p.created) / PARTICLE_LIFETIME;
        if (life > 1) {
          if (p.el && p.el.parentNode) p.el.parentNode.removeChild(p.el);
          return false;
        }
        p.el.style.left = p.x + p.dx * 30 * life + 'px';
        p.el.style.top = p.y + p.dy * 30 * life + 'px';
        p.el.style.width = p.size * (1 - life * 0.7) + 'px';
        p.el.style.height = p.size * (1 - life * 0.7) + 'px';
        return true;
      });
      animationFrame.current = requestAnimationFrame(animate);
    }
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  // Контейнер для частинок (портал)
  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ left: '50vw', top: '50vh' }} />
      <div ref={particlesContainerRef} />
    </>
  );
};

export default CustomCursor; 