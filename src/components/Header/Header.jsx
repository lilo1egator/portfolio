import './Header.scss';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const handleSmoothScroll = (e, href, close) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - 64,
      behavior: 'smooth',
    });
  }
  if (close) close();
};

const Header = ({ activeSection }) => {
  const [open, setOpen] = useState(false);

  // close on Esc and when resizing above mobile breakpoint
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 580) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <header className="header">
      {/* Бургер-кнопка для мобільних */}
      <button
        type="button"
        className={`header__burger ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="header-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="header-menu" className={`header__nav ${open ? 'is-open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`header__link${activeSection === link.href.replace('#', '') ? ' active' : ''}`}
            onClick={e => handleSmoothScroll(e, link.href, () => setOpen(false))}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
