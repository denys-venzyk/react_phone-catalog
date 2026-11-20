import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';

const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

export const Header = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.nav__link, { [styles['nav__link--active']]: isActive });

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconLink, { [styles['iconLink--active']]: isActive });

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img
          src="/img/Logo.svg"
          alt="Nice Gadgets"
          className={styles.logo__img}
        />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={getNavLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={getIconLinkClass}
          aria-label="Favorites"
        >
          <img
            src="/img/Favorites(Empty).png"
            alt="Favorites"
            className={styles.iconLink__img}
          />
        </NavLink>
        <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
          <img
            src="/img/Cart(Empty).png"
            alt="Cart"
            className={styles.iconLink__img}
          />
        </NavLink>
      </div>
    </header>
  );
};
