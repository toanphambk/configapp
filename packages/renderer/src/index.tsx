import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import {Providers} from './redux/provider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import '../input.css';

const container = document.getElementById('app');
if (container) {
  const queryClient = new QueryClient();
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Providers>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Providers>
    </React.StrictMode>,
  );
}
