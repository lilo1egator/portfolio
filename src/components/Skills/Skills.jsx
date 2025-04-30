import './Skills.scss';
import { motion } from 'framer-motion';
import { SiReact, SiJavascript, SiTypescript, SiSass, SiHtml5, SiCss3, SiGit, SiFigma, SiRedux, SiFramer, SiBootstrap, SiGithub, SiNodedotjs, SiFirebase, SiTailwindcss, SiDocker, SiNpm, SiGulp } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';

const skills = [
  { name: 'React', icon: SiReact },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'SCSS', icon: SiSass },
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss3 },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Redux', icon: SiRedux },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Docker', icon: SiDocker },
  { name: 'npm', icon: SiNpm },
  { name: 'Gulp', icon: SiGulp },
  { name: 'Figma', icon: SiFigma },
];

const rows = [6, 5, 4, 3];

const splitSkillsToRows = (skills, rows) => {
  const result = [];
  let idx = 0;
  for (let r = 0; r < rows.length; r++) {
    result.push(skills.slice(idx, idx + rows[r]));
    idx += rows[r];
  }
  if (idx < skills.length) result.push(skills.slice(idx));
  return result;
};

const Skills = () => {
  const skillsRows = splitSkillsToRows(skills, rows);
  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        <motion.h2
          className="skills__title"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        >
          My Skills
        </motion.h2>
        <motion.div
          className="skills__title-line"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.77, 0, 0.18, 1] }}
        />
        <motion.div
          className="skills__desc"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.77, 0, 0.18, 1] }}
        >
          <span style={{ fontWeight: 700, color: '#00e0d6', letterSpacing: '1px' }}>Technologies</span> & <span style={{ fontWeight: 700, color: '#5b8cff', letterSpacing: '1px' }}>tools</span> <br />
          <span style={{ opacity: 0.85 }}>that empower my <span style={{ color: '#00ffe7', fontWeight: 700 }}>frontend magic</span> every day.</span>
        </motion.div>
        <div className="skills__arrow">
          <HiArrowDown />
        </div>
        <div className="skills__icons-flex">
          {skillsRows.map((row, rowIdx) => (
            <div className={`skills__row skills__row--${rowIdx + 1}`} key={rowIdx}>
              {row.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    className="skills__icon-badge"
                    key={skill.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.5, delay: 0.08 * (rowIdx * 6 + idx), ease: [0.77, 0, 0.18, 1] }}
                  >
                    <Icon className="skills__icon" />
                    <span className="skills__icon-tooltip">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 