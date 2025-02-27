'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, useState } from 'react';

import { QueryProviderProps } from './types';

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
