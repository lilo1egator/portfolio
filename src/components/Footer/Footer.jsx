import './Footer.scss';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';

const GITHUB_LINK = 'https://github.com/your-github';
const LINKEDIN_LINK = 'https://linkedin.com/in/your-linkedin';
const TELEGRAM_LINK = 'https://t.me/your-telegram';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__copyright">
        © {new Date().getFullYear()} Oleh Zelenskiy
      </div>
      <div className="footer__socials">
        <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__icon-link">
          <FaGithub />
        </a>
        <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__icon-link">
          <FaLinkedin />
        </a>
        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="footer__icon-link">
          <FaTelegram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer; 