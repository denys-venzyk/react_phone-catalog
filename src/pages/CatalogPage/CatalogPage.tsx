import { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import style from './CatalogPage.module.scss';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  type: Category;
};

const TITLE_MAP: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(loaded => setProducts(loaded))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = products.filter(
    product => product.category === type,
  );

  return (
    <div className={style.catalog}>
      <Breadcrumbs type={type} />
      <div className={style.catalog__titles}>
        <h1 className={style.catalog__title}>{TITLE_MAP[type]}</h1>
        <span
          className={style.catalog__models}
        >{`${filteredProducts.length} models`}</span>
      </div>
      {isLoading && <Loader />}

      {!isLoading && !hasError && <ProductsList products={filteredProducts} />}
    </div>
  );
};
