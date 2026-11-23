import { Link } from 'react-router-dom';
import style from './PicturesSlider.module.scss';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const BANNERS_DATA = [
  { to: '/phones', image: '/img/banner-phones.png', category: 'phones' },
  { to: '/tablets', image: '/img/banner-tablets.png', category: 'tablets' },
  {
    to: '/accessories',
    image: '/img/banner-accessories.png',
    category: 'accessories',
  },
];

const ARROW_IMG_URL = '/img/ArrowUp.png';

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % BANNERS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      prev => (prev - 1 + BANNERS_DATA.length) % BANNERS_DATA.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className={style.slider}>
      <div className={style.slider__main}>
        <button
          className={`${style.slider__button} ${style['slider__button--prev']}`}
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
        >
          <img
            src={ARROW_IMG_URL}
            alt="Previous slide"
            className={style.slider__icon}
          />
        </button>

        <div className={style.slider__viewport}>
          <div
            className={style.slider__track}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {BANNERS_DATA.map(banner => (
              <Link
                to={banner.to}
                className={style.slider__banner}
                key={banner.category}
              >
                <img
                  src={banner.image}
                  alt="Banner"
                  className={style.slider__img}
                />
              </Link>
            ))}
          </div>
        </div>

        <button
          className={`${style.slider__button} ${style['slider__button--next']}`}
          type="button"
          onClick={handleNext}
          disabled={activeIndex === BANNERS_DATA.length - 1}
        >
          <img
            src={ARROW_IMG_URL}
            alt="Next slide"
            className={style.slider__icon}
          />
        </button>
      </div>

      <div className={style.slider__dots}>
        <div className={style.container}>
          {BANNERS_DATA.map((banner, index) => (
            <button
              key={banner.category}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(style.slider__dot, {
                [style['slider__dot--active']]: index === activeIndex,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
