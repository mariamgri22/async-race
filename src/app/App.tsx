import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Fallback } from '@/shared/ui/Fallback/Fallback';
import { ErrorBoundary } from '@/widgets/ErrorBoundary';

import GaragePage from '../pages/GaragePage';
import WinnersPage from '../pages/WinnersPage';

import routes from './constants/routes';

export default function App(): React.ReactNode {
  return (
    <ErrorBoundary fallback={(error) => <Fallback text={error?.message || 'Undefined error'} />}>
      <Suspense fallback={<Fallback text="Loading..." />}>
        <Routes>
          <Route path={routes.garage} element={<GaragePage />} />
          <Route path={routes.winners} element={<WinnersPage />} />
          <Route path="*" element={<Fallback text="404 | This page could not be found" />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
