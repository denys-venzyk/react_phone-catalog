import style from './Footer.module.scss';

import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    link: 'https://github.com/denys-venzyk/react_phone-catalog',
    label: 'GITHUB',
  },
  { link: '#', label: 'CONTACTS' },
  { link: '', label: 'RIGHTS' },
];

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={style.footer}>
      <Link to="/" className={style.logo}>
        <img
          src="/img/Logo.svg"
          alt="Nice Gadets"
          className={style.logo__img}
        />
      </Link>

      <ul className={style.list}>
        {FOOTER_LINKS.map(({ link, label }) => (
          <li key={link}>
            <a href={link} className={style.list__link}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleBackToTop}>
        <span>Back to top</span>
        <span>
          <img src="/img/Stroke(vertical).png" alt="" />
        </span>
      </button>
    </footer>
  );
};
