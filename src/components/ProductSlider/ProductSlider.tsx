import style from './ProductSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { useState } from 'react';

type Props = {
  title: string;
  products: Product[];
};

const CARD_WIDTH = 272;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
const VISIBLE_CARDS = 4;

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function getMaxIndex(visibleCards: number) {
    return Math.max(0, products.length - visibleCards);
  }

  const maxIndex = getMaxIndex(VISIBLE_CARDS);
  const offset = currentIndex * STEP;

  function handlePrev() {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }

  function handleNext() {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  }

  return (
    <>
      <header className={style.header}>
        <h2 className={style.header__title}>{title}</h2>
        <div className={style.actions}>
          <button
            type="button"
            className={style.actions__button}
            aria-label="Previous slide"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img
              src="/img/ArrowUp.png"
              alt=""
              className={`${style.actions__arrow} ${style['actions__arrow--left']}`}
            />
          </button>
          <button
            type="button"
            className={style.actions__button}
            aria-label="Next slide"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
          >
            <img
              src="/img/ArrowUp.png"
              alt=""
              className={`${style.actions__arrow} ${style['actions__arrow--right']}`}
            />
          </button>
        </div>
      </header>
      <section className={style.slider}>
        <div
          className={style.container}
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
};
