import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App.jsx'
import store from '../store.js'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <App />
    </Provider>
    </QueryClientProvider>
    
  </StrictMode>,
)
