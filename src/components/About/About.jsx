import './About.scss';
import { useState, useEffect } from 'react';
import SocialLinks from '../SocialLinks';

const TYPED_TEXT = 'FRONTEND DEVELOPER';
const NAME = 'Oleh Zelenskyi';
const RESUME_LINK = '/resume.pdf';


const About = () => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    let timeoutId;

    const typeNext = () => {
      setTyped(TYPED_TEXT.slice(0, i + 1));
      i += 1;
      if (i < TYPED_TEXT.length) {
        timeoutId = setTimeout(typeNext, 70);
      }
    };

    typeNext();

    return () => clearTimeout(timeoutId);
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
          <SocialLinks className="hero-intro__socials" />
        </div>
      </div>
    </section>
  );
};

export default About; 