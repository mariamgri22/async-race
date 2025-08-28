import clsx from 'clsx';

import { PageNavigation } from '@/features/PageNavigation';
import { Signborder } from '@/shared/ui/Signborder/Signborder';

import styles from './Header.module.scss';

type Props = object;

export const Header = ({}: Props) => {
  return (
    <header className={styles.header}>
      <PageNavigation />
      <div className={clsx(styles.header__shevrons, styles.header__shevrons_bottom)} />
      <Signborder text="Async Race" style={{ margin: '0 auto' }} />
      <div className={clsx(styles.header__shevrons, styles.header__shevrons_top)} />
    </header>
  );
};
