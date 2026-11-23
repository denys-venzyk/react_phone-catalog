import { Category } from '../../types/Category';
import style from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  type: Category;
};

const BREADCRUMB_MAP: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Breadcrumbs: React.FC<Props> = ({ type }) => {
  return (
    <div className={style.breadcrumbs}>
      <Link to={'/'} className={style.breadcrumbs__link}>
        <img
          src="/img/Home.png"
          alt="Home"
          aria-label="Home"
          className={style.breadcrumbs__img}
        />
      </Link>
      <img
        src="/img/ArrowRight.png"
        alt="Arrow right"
        aria-label="Arrow right"
        className={style.breadcrumbs__img}
      />
      <span className={style.breadcrumbs__text}>{BREADCRUMB_MAP[type]}</span>
    </div>
  );
};
