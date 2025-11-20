import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { SiReact, SiRedux, SiSass, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiGit, SiGithub, SiFramer, SiBootstrap, SiTailwindcss, SiNodedotjs, SiFirebase, SiDocker, SiNpm, SiGulp, SiFigma } from 'react-icons/si';

const MAX_ROTATE = 9;

const techIcons = {
  React: SiReact,
  Redux: SiRedux,
  SCSS: SiSass,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Git: SiGit,
  GitHub: SiGithub,
  'Framer Motion': SiFramer,
  Bootstrap: SiBootstrap,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  Firebase: SiFirebase,
  Docker: SiDocker,
  npm: SiNpm,
  Gulp: SiGulp,
  Figma: SiFigma,
  OpenWeatherMap: SiJavascript, // fallback icon
};

const ProjectCard = ({ title, desc, link, site, img, technologies = [] }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    rotateY.set(((x - centerX) / centerX) * MAX_ROTATE);
    rotateX.set(((y - centerY) / centerY) * MAX_ROTATE);
    setGlare({
      x: percentX,
      y: percentY,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      style={{
        rotateX: springX,
        rotateY: springY,
        z: 2,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <div
        className="project-card__glare"
        style={{
          '--x': `${glare.x}%`,
          '--y': `${glare.y}%`,
          opacity: glare.opacity,
        }}
      />
      <div
        className="project-card__shine"
        style={{
          '--x': `${glare.x}%`,
          '--y': `${glare.y}%`,
          opacity: glare.opacity,
        }}
      />
      <div className="project-card__img">
        {img ? <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /> : <span>🖼️</span>}
      </div>
      <div className="project-card__content">
        <div className="project-card__title">{title}</div>
        <div className="project-card__desc">{desc}</div>
        {technologies.length > 0 && (
          <div className="project-card__tech">
            {technologies.map((tech) => {
              const Icon = techIcons[tech] || SiJavascript;
              return (
                <span className="project-card__tech-icon" key={tech} title={tech}>
                  <Icon />
                </span>
              );
            })}
          </div>
        )}
        <div className="project-card__actions">
          {site && (
            <a href={site} className="project-card__btn project-card__btn--site" target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Visit Site <span className="project-card__btn-arrow">→</span>
            </a>
          )}
          <a href={link} className="project-card__btn project-card__btn--github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 