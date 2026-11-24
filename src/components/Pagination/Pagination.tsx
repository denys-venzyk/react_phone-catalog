import { useMemo } from 'react';
import style from './Pagination.module.scss';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const visiblePages = useMemo(() => {
    const PAGE_GROUP_SIZE = 4;

    const startPage =
      Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + (PAGE_GROUP_SIZE - 1), totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  }, [currentPage, totalPages]);

  if (!perPage || totalPages <= 1) {
    return null;
  }

  return (
    <div className={style.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${style.pagination__arrow} ${style['pagination__arrow--prev']}`}
      >
        <img
          src="/img/ArrowUp.png"
          alt="Previous page"
          aria-label="Previous page"
          className={`${style.pagination__img} ${style['pagination__img--prev']}`}
        />
      </button>

      <div className={style.pagination__pages}>
        {visiblePages.map(page => (
          <button
            type="button"
            key={page}
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
            className={cn(style.pagination__page, {
              [style['pagination__page--active']]: page === currentPage,
            })}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${style.pagination__arrow} ${style['pagination__arrow--next']}`}
      >
        <img
          src="/img/ArrowUp.png"
          alt="Next page"
          aria-label="Next page"
          className={`${style.pagination__img} ${style['pagination__img--next']}`}
        />
      </button>
    </div>
  );
};
