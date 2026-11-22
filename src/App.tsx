import './App.scss';
import 'the-new-css-reset/css/reset.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { ProductCardPage } from './pages/ProductCardPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<CatalogPage type="phones" />} />
      <Route path="tablets" element={<CatalogPage type="tablets" />} />
      <Route path="accessories" element={<CatalogPage type="accessories" />} />
      <Route path="product/:productId" element={<ProductCardPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
