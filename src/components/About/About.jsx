import { useEffect, useRef } from "react";
import SocialLinks from "../SocialLinks";
import "./About.scss";

const TYPED_TEXT = "FRONTEND DEVELOPER";
const NAME = "Oleh Zelenskyi";
const RESUME_LINK = "/resume.pdf";

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const intervalMs = 80;
    let i = 0;
    let rafId;
    let lastTime = performance.now();

    // невелика пауза перед стартом друку (щоб фон / курсор встигли запуститись)
    const startTimeout = setTimeout(() => {
      const step = (now) => {
        // чекаємо, поки пройде intervalMs між символами
        if (now - lastTime >= intervalMs) {
          lastTime = now;
          i += 1;
          el.textContent = TYPED_TEXT.slice(0, i);
          if (i >= TYPED_TEXT.length) return; // друк закінчено
        }
        rafId = requestAnimationFrame(step);
      };

      rafId = requestAnimationFrame(step);
    }, 200); // 200–300 мс – комфортно

    return () => {
      clearTimeout(startTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero-intro" id="about">
      <div className="hero-intro__container hero-intro__container--minimal">
        <div className="hero-intro__main">
          <div className="hero-intro__hi hero-intro__hi--big">Hi, I&apos;m</div>

          <h1 className="hero-intro__typewriter hero-intro__typewriter--huge">
            <span ref={textRef}></span>
            <span className="hero-intro__cursor" aria-hidden="true"></span>
          </h1>

          <div className="hero-intro__desc hero-intro__desc--big">
            My name is <span className="hero-intro__name-accent">{NAME}</span> and I create
            modern, fast, and aesthetic web interfaces.
          </div>
        </div>

        <div className="hero-intro__actions">
          <a
            href={RESUME_LINK}
            className="hero-intro__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <SocialLinks className="hero-intro__socials" />
        </div>
      </div>
    </section>
  );
};

export default About;
