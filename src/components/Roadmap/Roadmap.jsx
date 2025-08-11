import './Roadmap.scss';
import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Cosmo from '../Cosmo';

const roadmapData = [
  { title: "Lutsk NTU Bachelor's degree", start: 'Sep 2018', end: 'Mar 2022', desc: 'Faculty of Computer Science.' },
  { title: 'Web Developer "Vizor"', start: 'Jun 2021', end: 'Feb 2022', desc: 'Creating simple websites, web development admin panel' },
  { title: "Lutsk NTU, Master's degree", start: 'Sep 2022', end: 'Dec 2023', desc: 'Faculty of Computer Science.' },
  { title: 'Frontend developer "Contentmania"', start: 'Jun 2022', end: 'Now', desc: 'Frontend developer' },
];

const ITEM_SPACING = 120;
const TOP_PAD = 40;
const TIMELINE_HEIGHT = roadmapData.length * ITEM_SPACING;
const DOTS_Y_DESKTOP = roadmapData.map((_, i) => TOP_PAD + i * ITEM_SPACING);

// breakpoint хук
function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= bp : false
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const onChange = e => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
    };
  }, [bp]);
  return isMobile;
}

export default function Roadmap() {
  const isMobile = useIsMobile(768);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]); // refs для измерений карточек

  // динамические величины для мобилки
  const [dotsY, setDotsY] = useState(DOTS_Y_DESKTOP);
  const [tlHeight, setTlHeight] = useState(TIMELINE_HEIGHT);

  // анимация линии
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 90%', 'end 60%'] });
  const [wasVisible, setWasVisible] = useState(Array(roadmapData.length).fill(false));
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const lineLength = Math.max(0, tlHeight - TOP_PAD * 2);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v * lineLength));
    return () => unsub();
  }, [scrollYProgress, lineLength]);

  // пересчёт позиций точек на мобиле по реальной геометрии карточек
  useLayoutEffect(() => {
    if (!isMobile) {
      setDotsY(DOTS_Y_DESKTOP);
      setTlHeight(TIMELINE_HEIGHT);
      return;
    }
    const recalc = () => {
      const ys = stepRefs.current.map((el) => {
        if (!el) return 0;
        const card = el.querySelector('.roadmap__card');
        const half = card ? card.offsetHeight / 2 : el.offsetHeight / 2;
        return el.offsetTop + half; // точка по центру карточки
      });
      setDotsY(ys);

      const lastEl = stepRefs.current[stepRefs.current.length - 1];
      const lastCard = lastEl?.querySelector('.roadmap__card');
      const bottom = (lastEl?.offsetTop || 0) + (lastCard?.offsetHeight || lastEl?.offsetHeight || 0) + TOP_PAD;
      setTlHeight(Math.max(bottom, TIMELINE_HEIGHT)); // запас, чтобы линия не обрывалась
    };

    recalc();

    // обновлять при ресайзе/изменении контента
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recalc) : null;
    if (ro && timelineRef.current) ro.observe(timelineRef.current);
    window.addEventListener('resize', recalc);
    const t = setTimeout(recalc, 0); // после отрисовки шрифтов

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', recalc);
      clearTimeout(t);
    };
  }, [isMobile]);

  // показать точки/карточки, когда линия «дошла»
  useEffect(() => {
    setWasVisible(prev => prev.map((w, i) => w || progress >= (dotsY[i] - 100)));
    setMaxProgress(prev => (progress > prev ? progress : prev));
  }, [progress, dotsY]);

  return (
    <section className="roadmap" id="roadmap">
      <div className="roadmap__container">
        <h2 className="roadmap__title">Roadmap</h2>

        <div className="roadmap__content">
          <div className="roadmap__glass">
            <div className="roadmap__timeline" ref={timelineRef} style={{ minHeight: tlHeight }}>
              {/* ЛИНИЯ + ТОЧКИ */}
              <svg
                className="roadmap__svg"
                width={isMobile ? 40 : 60}
                height={tlHeight}
                style={{
                  position: 'absolute',
                  left: isMobile ? 16 : '50%',
                  top: 0,
                  transform: isMobile ? 'none' : 'translateX(-50%)',
                  zIndex: 1,
                  background: 'rgba(0,0,0,0.01)'
                }}
              >
                <line
                  x1={isMobile ? 20 : 30}
                  y1={TOP_PAD}
                  x2={isMobile ? 20 : 30}
                  y2={tlHeight - TOP_PAD}
                  stroke="#e0e6ed"
                  strokeWidth={isMobile ? 6 : 8}
                  strokeLinecap="round"
                  shapeRendering="crispEdges"
                  strokeDasharray={lineLength}
                  strokeDashoffset={Math.max(0, lineLength - maxProgress)}
                />
                {dotsY.map((y, idx) => (
                  <g key={idx}>
                    <motion.circle
                      cx={isMobile ? 20 : 30}
                      cy={y}
                      r={isMobile ? 12 : 14}
                      stroke="#e0e6ed"
                      strokeWidth={isMobile ? 3.5 : 4.5}
                      fill="#1e2746"
                      filter="drop-shadow(0 2px 8px #bfc9d122)"
                      shapeRendering="crispEdges"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={wasVisible[idx] ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    />
                    <ellipse
                      cx={(isMobile ? 20 : 30) - 4}
                      cy={y - 4}
                      rx={isMobile ? 2 : 2.2}
                      ry={isMobile ? 1 : 1.2}
                      fill="#fff"
                      opacity="0.7"
                    />
                  </g>
                ))}
              </svg>

              {/* КАРТОЧКИ */}
              {roadmapData.map((step, idx) => {
                const desktopStyle = {
                  position: 'absolute',
                  top: DOTS_Y_DESKTOP[idx] - 60,
                  left: idx % 2 === 0 ? '0' : '50%',
                  width: '50%',
                };
                const mobileStyle = {
                  position: 'relative',
                  top: 'auto',
                  left: 0,
                  width: '100%',
                  marginLeft: 56,
                  marginBottom: 32,
                };

                return (
                  <motion.div
                    ref={el => (stepRefs.current[idx] = el)}
                    className={`roadmap__step ${idx % 2 === 0 ? 'left' : 'right'}`}
                    key={step.start}
                    style={isMobile ? mobileStyle : desktopStyle}
                    initial={{ opacity: 0, y: 40 }}
                    animate={wasVisible[idx] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.1 * idx }}
                  >
                    <div className={`roadmap__card roadmap__card--${idx % 2 === 0 ? 'left' : 'right'}`}>
                      <div className="roadmap__step-title">{step.title}</div>
                      <div className="roadmap__step-dates">{step.start} — {step.end}</div>
                      <div className="roadmap__desc">{step.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="roadmap__cosmo">
            <Cosmo height={tlHeight} />
          </div>
        </div>
      </div>
    </section>
  );
}
