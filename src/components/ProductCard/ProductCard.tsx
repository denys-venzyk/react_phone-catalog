import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCardDesc } from '../../types/ProductCardDesc';
import style from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const hasDiscount = product.fullPrice > product.price;

  return (
    <article className={style.card}>
      <Link to={`/product/${product.itemId}`} className={style.imageLink}>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={style.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={style.title}>
        {product.name}
      </Link>

      <div className={style.prices}>
        <span className={style.price}>${product.price}</span>
        {hasDiscount && (
          <span className={style.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={style.divider} />

      <div className={style.specs}>
        <div className={style.spec}>
          <span className={style.specName}>{ProductCardDesc.Screen}</span>
          <span className={style.specValue}>{product.screen}</span>
        </div>

        <div className={style.spec}>
          <span className={style.specName}>{ProductCardDesc.Capacity}</span>
          <span className={style.specValue}>{product.capacity}</span>
        </div>

        <div className={style.spec}>
          <span className={style.specName}>{ProductCardDesc.RAM}</span>
          <span className={style.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={style.actions}>
        <button type="button" className={style.addButton}>
          Add to cart
        </button>

        <button
          type="button"
          className={style.favoriteButton}
          aria-label="Add to favorites"
        >
          <img
            src="/img/Favorites(Empty).png"
            alt=""
            className={style.favoriteIcon}
          />
        </button>
      </div>
    </article>
  );
};
