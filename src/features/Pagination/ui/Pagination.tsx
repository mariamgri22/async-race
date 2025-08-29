import PlayIcon from '@/shared/assets/icons/play.svg?react';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  limit: number;
  totalCount: number;
  scrollPage: (page: number) => void;
};

export const Pagination = ({ currentPage, limit, totalCount, scrollPage }: Props) => {
  const hasNext = totalCount > 0 && limit > 0 && currentPage * limit < totalCount;
  const hasPrev = currentPage > 1;

  const handleNext = () => {
    if (hasNext) scrollPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (hasPrev) scrollPage(currentPage - 1);
  };

  return (
    <article className={styles.pagination}>
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__prev}
        onClick={handlePrev}
        disabled={!hasPrev}
        aria-label="Previous Page"
      >
        <PlayIcon />
      </Button>
      <p className={styles.pagination__page}>PAGE #{currentPage}</p>
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__next}
        onClick={handleNext}
        disabled={!hasNext}
        aria-label="Next Page"
      >
        <PlayIcon />
      </Button>
    </article>
  );
};
