'use client';

import React from 'react';
import Results from '../Results';
import { useApp } from '@/hooks';

const AllModals = () => {
  const { modals } = useApp();

  return <>{modals.results && <Results />}</>;
};

export default AllModals;
