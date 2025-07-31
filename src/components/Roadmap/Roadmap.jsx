import './Roadmap.scss';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Cosmo from '../Cosmo';

const roadmapData = [
  {
    title: 'Lutsk NTU Bachelor\'s degree',
    start: 'Sep 2018',
    end: 'Mar 2022',
    desc: 'Faculty of Computer Science.'
  },
  {
    title: 'Web Developer "Vizor"',
    start: 'Jun 2021',
    end: 'Feb 2022',
    desc: 'Creating simple websites, web development admin panel'
  },
  {
    title: 'Lutsk NTU, Master\'s degree',
    start: 'Sep 2022',
    end: 'Dec 2023',
    desc: 'Faculty of Computer Science.'
  },
  {
    title: 'Position Title',
    start: 'Jun 2022',
    end: 'Now',
    desc: 'Frontend developer'
  },
];

const TIMELINE_HEIGHT = roadmapData.length * 120;
const DOTS_Y = roadmapData.map((_, idx) => 40 + idx * 120);

export default function Roadmap() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 90%', 'end 60%'] });
  const lineLength = TIMELINE_HEIGHT - 80;

  // Для точок: якщо лінія дійшла до точки, точка зʼявляється і більше не зникає
  const [wasVisible, setWasVisible] = useState(Array(roadmapData.length).fill(false));
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => {
      const current = v * lineLength;
      setProgress(current);
    });
    return () => unsubscribe();
  }, [scrollYProgress, lineLength]);

  useEffect(() => {
    setWasVisible(prev => prev.map((was, idx) => was || progress >= (DOTS_Y[idx] - 100)));
    setMaxProgress(prev => (progress > prev ? progress : prev));
  }, [progress]);

  return (
    <section className="roadmap" id="roadmap">
      <div className="roadmap__container">
        <h2 className="roadmap__title">Roadmap</h2>
        <div className="roadmap__content">
          <div className="roadmap__glass">
            <div className="roadmap__timeline" ref={timelineRef} style={{ minHeight: TIMELINE_HEIGHT }}>
              <svg className="roadmap__svg" width="60" height={TIMELINE_HEIGHT} style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', zIndex: 1, background: 'rgba(0,0,0,0.01)' }}>
                <defs>
                  <radialGradient id="dot-gradient" cx="60%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#e0e6ed" />
                  </radialGradient>
                </defs>
                <line
                  x1="30" y1="40" x2="30" y2={TIMELINE_HEIGHT - 40}
                  stroke="#e0e6ed"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="1"
                  filter="none"
                  shapeRendering="crispEdges"
                  strokeDasharray={lineLength}
                  strokeDashoffset={lineLength - maxProgress}
                />
                {DOTS_Y.map((y, idx) => (
                  <g key={idx}>
                    <motion.circle
                      cx="30"
                      cy={y}
                      r="14"
                      stroke="#e0e6ed"
                      strokeWidth="4.5"
                      fill="#1e2746"
                      filter="drop-shadow(0 2px 8px #bfc9d122)"
                      shapeRendering="crispEdges"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={wasVisible[idx] ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    />
                    <ellipse
                      cx="26"
                      cy={y - 4}
                      rx="2.2"
                      ry="1.2"
                      fill="#fff"
                      opacity="0.7"
                    />
                  </g>
                ))}
              </svg>
              {roadmapData.map((step, idx) => (
                <motion.div
                  className={`roadmap__step ${idx % 2 === 0 ? 'left' : 'right'}`}
                  key={step.start}
                  style={{
                    position: 'absolute',
                    top: DOTS_Y[idx] - 60,
                    left: idx % 2 === 0 ? '0' : '50%',
                    width: '50%',
                  }}
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
              ))}
            </div>
          </div>
          <div className="roadmap__cosmo">
            <Cosmo height={TIMELINE_HEIGHT} />
          </div>
        </div>
      </div>
    </section>
  );
} 