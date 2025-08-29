import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/app/redux/store';

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <BrowserRouter basename={'/'}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </BrowserRouter>
  );
}
