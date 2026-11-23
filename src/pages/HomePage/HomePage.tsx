import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { ProductSlider } from '../../components/ProductSlider';
import style from './HomePage.module.scss';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const BRAND_NEW_MODELS_TITLE = 'Brand new models';
  const HOT_PRICES_TITLE = 'Hot prices';

  useEffect(() => {
    getProducts()
      .then(loaded => setProducts(loaded))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const brandNewProducts = useMemo(
    () =>
      [...products].sort((product1, product2) => product2.year - product1.year),
    [products],
  );
  const hotPricesProducts = useMemo(
    () =>
      products
        .filter(product => product.fullPrice > product.price)
        .sort((product1, product2) => {
          const firstCase = product1.fullPrice - product1.price;
          const secondCase = product2.fullPrice - product2.price;

          if (secondCase !== firstCase) {
            return secondCase - firstCase;
          }

          return product2.price - product1.price;
        }),
    [products],
  );

  return (
    <section className={style.container}>
      <h1 className={'visually-hidden'}>Product Catalog</h1>
      <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>

      <PicturesSlider />

      {isLoading && <Loader />}

      {!isLoading && !hasError && (
        <ProductSlider
          title={BRAND_NEW_MODELS_TITLE}
          products={brandNewProducts}
        />
      )}
      <ShopByCategory products={products} />

      {isLoading && <Loader />}

      {!isLoading && !hasError && (
        <ProductSlider title={HOT_PRICES_TITLE} products={hotPricesProducts} />
      )}
    </section>
  );
};
