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
  // 1. Helpers

  function hasNextPage() {
    if (!totalCount || !limit || !currentPage) return false;
    return currentPage * limit < totalCount;
  }

  function hasPrevPage() {
    if (!totalCount || !limit || !currentPage) return false;
    return currentPage > 1;
  }

  // 2. Actions

  function handleNext() {
    if (!hasNextPage()) return;
    scrollPage(currentPage + 1);
  }

  function handlePrev() {
    if (!hasPrevPage()) return;
    scrollPage(currentPage - 1);
  }

  // 3. Render

  return (
    <article className={styles.pagination}>
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__prev}
        onClick={handlePrev}
        disabled={!hasPrevPage()}
      >
        <PlayIcon />
      </Button>
      <p className={styles.pagination__page}>PAGE #{currentPage}</p>
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__next}
        onClick={handleNext}
        disabled={!hasNextPage()}
      >
        <PlayIcon />
      </Button>
    </article>
  );
};
