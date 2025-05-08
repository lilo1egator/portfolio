import './Footer.scss';
import SocialLinks from '../SocialLinks';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__copyright">
        © {new Date().getFullYear()} Oleh Zelenskyi
      </div>
      <SocialLinks className="footer__socials" iconClass="footer__icon-link" />
    </div>
  </footer>
);

export default Footer; 