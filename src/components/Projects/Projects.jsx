import './Projects.scss';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Tabs from './Tabs';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Websites', value: 'website' },
  { label: 'Webapps', value: 'webapp' },
];

const projects = [
  {
    id: 'weather-app',
    title: 'Weather App',
    desc: 'A modern weather forecast app using React, OpenWeatherMap API, and responsive design.',
    link: 'https://github.com/your-github/weather-app',
    site: 'https://weather-app-demo.site',
    img: '', // заглушка
    type: 'webapp',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    desc: 'Personal portfolio built with React, SCSS modules, and smooth animations.',
    link: 'https://github.com/your-github/portfolio',
    site: 'https://your-portfolio.site',
    img: '', // заглушка
    type: 'website',
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    desc: 'A productivity tool for managing daily tasks, built with React and Redux.',
    link: 'https://github.com/your-github/task-manager',
    site: 'https://task-manager-demo.site',
    img: '', // заглушка
    type: 'webapp',
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [displayedTab, setDisplayedTab] = useState('all');
  const [fade, setFade] = useState(true);

  // Fade-out, потім змінюємо таб, потім fade-in
  useEffect(() => {
    if (activeTab === displayedTab) return;
    setFade(false);
    const timeout = setTimeout(() => {
      setDisplayedTab(activeTab);
      setFade(true);
    }, 220); // 220ms fade-out
    return () => clearTimeout(timeout);
  }, [activeTab, displayedTab]);

  const filtered = displayedTab === 'all' ? projects : projects.filter(p => p.type === displayedTab);

  return (
    <section className="projects" id="projects">
      <div className="projects__container">
        <motion.h2
          className="projects__title"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="projects__title-line"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.77, 0, 0.18, 1] }}
        />
        <motion.div
          className="projects__desc"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.77, 0, 0.18, 1] }}
        >
          Here are some of my featured projects. Each one demonstrates my skills in frontend development and modern UI.
        </motion.div>
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <motion.div
          className="projects__list"
          layout
        >
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              style={{ width: '100%' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: 0.12 * idx, ease: [0.77, 0, 0.18, 1] }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 