import { useEffect, useRef } from 'react';
import './CustomCursor.scss';

const PARTICLE_LIFETIME = 400;
const PARTICLE_COUNT = 1.5;
const PARTICLE_LIMIT = 50;

const MAX_FPS = 30;
const FRAME_INTERVAL = 1000 / MAX_FPS;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrame = useRef();
  const lastEmitTime = useRef(0);

  // рух курсора + спавн частинок
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = performance.now();
      // тротл подій миші
      if (now - lastEmitTime.current < 20) return;
      lastEmitTime.current = now;

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
          created: now,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // canvas-рендер
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.2);

    function resizeCanvas() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // один раз малюємо неоновий кружок у спрайт
    const spriteSize = 40 * DPR;
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = spriteSize;
    const sctx = sprite.getContext('2d');

    if (sctx) {
      const cx = spriteSize / 2;
      const cy = spriteSize / 2;
      const r = spriteSize / 2;

      const grad = sctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, '#00ffe7');
      grad.addColorStop(1, '#5b8cff');

      sctx.fillStyle = grad;
      sctx.shadowColor = '#00ffe7';
      sctx.shadowBlur = 8 * DPR; // менший blur
      sctx.beginPath();
      sctx.arc(cx, cy, r, 0, Math.PI * 2);
      sctx.fill();
    }

    let lastFrame = performance.now();

    function render(ts) {
      const delta = ts - lastFrame;
      if (delta >= FRAME_INTERVAL) {
        lastFrame = ts;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = performance.now();

        particles.current = particles.current.filter((p) => {
          const life = (now - p.created) / PARTICLE_LIFETIME;
          if (life > 1) return false;

          const px = (p.x + p.dx * 25 * life) * DPR;
          const py = (p.y + p.dy * 25 * life) * DPR;
          const size = p.size * (1 - life * 0.7) * DPR;

          const alpha = 1 - life * 0.5;

          ctx.globalAlpha = alpha;
          ctx.drawImage(
            sprite,
            px - size / 2,
            py - size / 2,
            size,
            size
          );

          return true;
        });

        ctx.globalAlpha = 1;
      }

      animationFrame.current = requestAnimationFrame(render);
    }

    animationFrame.current = requestAnimationFrame(render);

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
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
};

export default CustomCursor;
