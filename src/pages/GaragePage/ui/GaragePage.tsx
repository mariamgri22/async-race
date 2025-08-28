import React from 'react';

import { WinnerModal } from '@/etities/Winner';
import { Fallback } from '@/shared/ui/Fallback/Fallback';
import { ErrorBoundary } from '@/widgets/ErrorBoundary';
import { GarageBottomControls } from '@/widgets/GarageBottomControls';
import { GarageCars } from '@/widgets/GarageCars';
import { GarageControls } from '@/widgets/GarageControls';
import { Header } from '@/widgets/Header';

import styles from './GaragePage.module.scss';

export default function GaragePage(): React.ReactNode {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <GarageControls />
        <ErrorBoundary
          fallback={(error) => <Fallback text={error?.message || 'Undefined error'} />}
        >
          <GarageCars />
        </ErrorBoundary>
        <GarageBottomControls />
      </main>
      <WinnerModal />
    </>
  );
}
