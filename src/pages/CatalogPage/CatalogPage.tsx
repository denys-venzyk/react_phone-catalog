import { useEffect, useMemo, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import style from './CatalogPage.module.scss';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { Sort } from '../../types/Sort';
import { Pagination } from '../../components/Pagination';

type Props = {
  type: Category;
};

const TITLE_MAP: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favorites',
};

const SORT_MAP = [
  { key: Sort.age, title: 'Newest' },
  { key: Sort.title, title: 'Alphabetically' },
  { key: Sort.price, title: 'Cheapest' },
];

const PER_PAGE_MAP = ['4', '8', '16', 'all'];

export const CatalogPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || Sort.age;
  const currentPerPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    getProducts()
      .then(loaded => setProducts(loaded))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    const filtered = products.filter(product => product.category === type);

    return [...filtered].sort((a, b) => {
      switch (currentSort) {
        case Sort.title:
          return a.name.localeCompare(b.name);
        case Sort.price:
          return a.price - b.price;
        case Sort.age:
        default:
          return b.year - a.year;
      }
    });
  }, [products, type, currentSort]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const newSort = event.target.value;

    if (newSort === Sort.age) {
      newParams.delete('sort');
    } else {
      newParams.set('sort', newSort);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const newPerPage = event.target.value;

    if (newPerPage === 'all') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', newPerPage);
    }

    newParams.delete('page');
    setSearchParams(newParams);
  };

  const visibleProducts = useMemo(() => {
    if (currentPerPage === 'all') {
      return sortedProducts;
    }

    const itemsCount = Number(currentPerPage);
    const startIndex = (currentPage - 1) * itemsCount;

    return sortedProducts.slice(startIndex, startIndex + itemsCount);
  }, [sortedProducts, currentPage, currentPerPage]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    const newPage = page;

    if (newPage === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(newPage));
    }

    setSearchParams(newParams);
  };

  return (
    <div className={style.catalog}>
      <Breadcrumbs type={type} />
      <div className={style.catalog__titles}>
        <h1 className={style.catalog__title}>{TITLE_MAP[type]}</h1>
        <span
          className={style.catalog__models}
        >{`${sortedProducts.length} models`}</span>
      </div>

      <div className={style.catalog__filters}>
        <div className={style.catalog__filter}>
          <label className={style.catalog__label} htmlFor="sort-by">
            Sort by
          </label>
          <select
            className={`${style.catalog__select} ${style['catalog__select--sort']}`}
            value={currentSort}
            onChange={handleSortChange}
          >
            {SORT_MAP.map(sort => (
              <option
                className={style.catalog__option}
                value={sort.key}
                key={sort.key}
              >
                {sort.title}
              </option>
            ))}
          </select>
        </div>

        <div className={style.catalog__filter}>
          <label className={style.catalog__label} htmlFor="items-on-page">
            Items on page
          </label>
          <select
            className={`${style.catalog__select} ${style['catalog__select--items']}`}
            value={currentPerPage}
            onChange={handlePerPageChange}
          >
            {PER_PAGE_MAP.map(perPage => (
              <option
                value={perPage}
                key={perPage}
                className={style.catalog__option}
              >
                {perPage}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !hasError && <ProductsList products={visibleProducts} />}

      <Pagination
        total={sortedProducts.length}
        perPage={Number(currentPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
