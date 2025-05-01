import React, { useEffect, useRef } from 'react';
import './CustomCursor.scss';

const PARTICLE_LIFETIME = 600; // ms
const PARTICLE_COUNT = 3; // менше частинок за рух
const PARTICLE_LIMIT = 120; // максимум частинок у стані

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animationFrame = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (particles.current.length >= PARTICLE_LIMIT) {
          particles.current.shift();
        }
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          dx: randomBetween(-2, 2),
          dy: randomBetween(-2, 2),
          size: randomBetween(4, 8),
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    function resizeCanvas() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      particles.current = particles.current.filter((p) => {
        const life = (now - p.created) / PARTICLE_LIFETIME;
        if (life > 1) return false;
        const px = (p.x + p.dx * 30 * life) * dpr;
        const py = (p.y + p.dy * 30 * life) * dpr;
        const size = p.size * (1 - life * 0.7) * dpr;
        // Неоновий градієнт
        const grad = ctx.createRadialGradient(px, py, 0, px, py, size / 2);
        grad.addColorStop(0, '#00ffe7');
        grad.addColorStop(1, '#5b8cff');
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.shadowColor = '#00ffe7';
        ctx.shadowBlur = 12 * (1 - life);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });
      animationFrame.current = requestAnimationFrame(draw);
    }
    animationFrame.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 2147483646,
        }}
      />
      <div ref={cursorRef} className="custom-cursor" style={{ left: '50vw', top: '50vh' }} />
    </>
  );
};

export default CustomCursor; 