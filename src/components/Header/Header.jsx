import './Header.scss';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const handleSmoothScroll = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - 64, // відступ під фіксовану шапку
      behavior: 'smooth',
    });
  }
};

const Header = ({ activeSection }) => (
  <header className="header">
    <nav className="header__nav">
      {navLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          className={`header__link${activeSection === link.href.replace('#', '') ? ' active' : ''}`}
          onClick={e => handleSmoothScroll(e, link.href)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  </header>
);

export default Header; 