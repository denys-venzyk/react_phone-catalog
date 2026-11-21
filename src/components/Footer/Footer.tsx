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
      <div className={style.container}>
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

        <button
          type="button"
          onClick={handleBackToTop}
          className={style.backToTop}
        >
          <span className={style.backToTop__text}>Back to top</span>
          <span className={style.backToTop__arrow}>
            <img
              src="/img/ArrowUp.png"
              alt=""
              className={style.backToTop__img}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
