import './About.scss';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';

const TYPED_TEXT = 'FRONTEND DEVELOPER';
const NAME = 'Oleh Zelenskiy';
const RESUME_LINK = '/resume.pdf';
const GITHUB_LINK = 'https://github.com/your-github';
const LINKEDIN_LINK = 'https://linkedin.com/in/your-linkedin';
const TELEGRAM_LINK = 'https://t.me/your-telegram';


const About = () => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(TYPED_TEXT.slice(0, i + 1));
      i++;
      if (i === TYPED_TEXT.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-intro" id="about">
      <div className="hero-intro__container hero-intro__container--minimal">
        <div className="hero-intro__main">
          <div className="hero-intro__hi hero-intro__hi--big">Hi, I&apos;m</div>
          <h1 className="hero-intro__typewriter hero-intro__typewriter--huge">
            {typed}
            <span className="hero-intro__cursor" aria-hidden="true"></span>
          </h1>
          <div className="hero-intro__desc hero-intro__desc--big">
            My name is <span className="hero-intro__name-accent">{NAME}</span> and I create modern, fast, and aesthetic web interfaces.
          </div>
        </div>
        <div className="hero-intro__actions">
          <a href={RESUME_LINK} className="hero-intro__btn" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <div className="hero-intro__socials">
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 