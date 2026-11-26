import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import cn from 'classnames';
import { useFavorites } from '../../context/FavoritesContext';

const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/phones', label: 'PHONES' },
  { to: '/tablets', label: 'TABLETS' },
  { to: '/accessories', label: 'ACCESSORIES' },
];

export const Header = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(style.nav__link, { [style['nav__link--active']]: isActive });

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(style.iconLink, { [style['iconLink--active']]: isActive });

  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        <img
          src="/img/Logo.svg"
          alt="Nice Gadgets"
          className={style.logo__img}
        />
      </Link>

      <nav className={style.nav}>
        <ul className={style.nav__list}>
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={getNavLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={style.actions}>
        <NavLink
          to="/favorites"
          className={getIconLinkClass}
          aria-label="Favorites"
        >
          <div className={style.iconLink__wrapper}>
            <img
              src="/img/Favorites(Empty).png"
              alt="Favorites"
              className={style.iconLink__img}
            />
            {favoritesCount > 0 && (
              <span className={style.iconLink__badge}>
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </div>
        </NavLink>
        <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
          <img
            src="/img/Cart(Empty).png"
            alt="Cart"
            className={style.iconLink__img}
          />
        </NavLink>
      </div>
    </header>
  );
};
