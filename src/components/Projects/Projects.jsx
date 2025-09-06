import './Projects.scss';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Tabs from './Tabs';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Websites', value: 'website' },
  { label: 'Webapps', value: 'webapp' },
];

const projects = [
  {
    id: 'marvel-app',
    title: 'Marvel',
    desc: 'A modern web application built with React and SCSS. Features routing and component-based architecture.',
    link: 'https://github.com/lilo1egator/marvel',
    site: 'https://github.com/lilo1egator/marvel',
    img: '/assets/projects/marvel.jpg',
    type: 'webapp',
    technologies: ['React', 'React Router', 'SCSS', 'PropTypes'],
  },
  {
      id: 'pulse',
      title: 'Pulse',
      desc: 'A modern landing page for heart rate monitors with animated counters, product catalog, consultation forms, and micro-animations. Built with HTML, SCSS, and jQuery.',
      link: 'https://github.com/lilo1egator/pulse',
      site: 'https://pulse-tan.vercel.app/',
      img: '/assets/projects/pulse.jpg',
      type: 'website',
      technologies: ['HTML', 'SCSS', 'jQuery', 'Gulp'],
  },
  {
    id: 'typego',
    title: 'TypeGo',
    desc: 'A modern typing speed trainer app with real-time stats, history, dark/light themes, and multilingual support (EN/UA). Built with React, Express, and SCSS.',
    link: 'https://github.com/lilo1egator/TypeGo',
    site: 'https://type-go.vercel.app/',
    img: '/assets/projects/typego.jpg',
    type: 'webapp',
    technologies: ['React', 'Express', 'SCSS'],
  },
  {
    id: 'food',
    title: 'FoodJS Landing',
    desc: 'A modern and responsive landing page for the FoodJS project, showcasing features and design.',
    link: 'https://github.com/lilo1egator/Food',
    site: 'https://food-phi-one.vercel.app/',
    img: '/assets/projects/food.jpg',
    type: 'website',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'weather',
    title: 'User Weather',
    desc: 'A simple website where users can quickly check the current weather in their location.',
    link: 'https://github.com/lilo1egator/UserWeather',
    site: 'https://user-weather-eight.vercel.app/',
    img: '/assets/projects/photo_2025-09-06_10-51-58.jpg',
    type: 'webapp',
    technologies: ['React', 'Next.js', 'Tailwind'],
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? projects : projects.filter(p => p.type === activeTab);

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
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                layoutId={project.id}
                style={{ width: '100%' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.77, 0, 0.18, 1] }}
              >
                <ProjectCard {...project} technologies={project.technologies} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
