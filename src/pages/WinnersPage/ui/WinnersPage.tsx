import React from 'react';

import { Fallback } from '@/shared/ui/Fallback/Fallback';
import { ErrorBoundary } from '@/widgets/ErrorBoundary';
import { Header } from '@/widgets/Header';
import { WinnersBottomControls } from '@/widgets/WinnersBottomControls';
import { WinnersTable } from '@/widgets/WinnersTable';

import styles from './WinnersPage.module.scss';

export default function WinnersPage(): React.ReactNode {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.main__header}>WINNERS</h1>
        <ErrorBoundary
          fallback={(error) => <Fallback text={error?.message || 'Undefined error'} />}
        >
          <WinnersTable />
        </ErrorBoundary>
        <WinnersBottomControls />
      </main>
    </>
  );
}
