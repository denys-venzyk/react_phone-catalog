import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>,
);
