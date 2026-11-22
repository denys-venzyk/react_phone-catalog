import React from 'react';
import { Link } from 'react-router-dom';
import style from './ShopByCategory.module.scss';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

const CATEGORIES_DATA = [
  {
    to: '/phones',
    title: 'Mobile phones',
    image: '/img/category-phones.webp',
    categoryKey: 'phones',
    backgroundColor: '#6D6474',
  },
  {
    to: '/tablets',
    title: 'Tablets',
    image: '/img/category-tablets.png',
    categoryKey: 'tablets',
    backgroundColor: '#8D8D92',
  },
  {
    to: '/accessories',
    title: 'Accessories',
    image: '/img/category-accessories.png',
    categoryKey: 'accessories',
    backgroundColor: '#973D5F',
  },
];

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  return (
    <section className={style.container}>
      <h2 className={style.title}>Shop by category</h2>
      <div className={style.cards}>
        {CATEGORIES_DATA.map(category => {
          const productsAmount = products.filter(
            product => product.category === category.categoryKey,
          );

          return (
            <div key={category.categoryKey} className={style.card}>
              <Link
                to={category.to}
                className={style.card__link}
                style={{ backgroundColor: category.backgroundColor }}
              >
                <img
                  src={category.image}
                  alt={`Category ${category.categoryKey}`}
                  className={`${style.card__img} ${style[`card__img--${category.categoryKey}`]}`}
                />
              </Link>
              <Link to={category.to} className={style.card__title}>
                {category.title}
              </Link>
              <span
                className={style.card__amount}
              >{`${productsAmount.length} models`}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
