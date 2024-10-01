import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import React from 'react';

import '@/styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
