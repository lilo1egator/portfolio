import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';

const GITHUB_LINK = 'https://github.com/lilo1egator';
const LINKEDIN_LINK = 'https://linkedin.com/in/your-linkedin';
const TELEGRAM_LINK = 'https://t.me/helgo_333';

const SocialLinks = ({ className = '', iconClass = '' }) => (
  <div className={`social-links ${className}`.trim()}>
    <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClass}>
      <FaGithub />
    </a>
    <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconClass}>
      <FaLinkedin />
    </a>
    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={iconClass}>
      <FaTelegram />
    </a>
  </div>
);

export default SocialLinks; 