import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context/FavoritesContext';
import style from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={style.favorites}>
      <Breadcrumbs type="favorites" />
      <div className={style.favorites__titles}>
        <h1 className={style.favorites__title}>Favorites</h1>
        <span
          className={style.favorites__items}
        >{`${favorites.length} items`}</span>
      </div>

      <div>
        <ProductsList products={favorites} />
      </div>
    </div>
  );
};
