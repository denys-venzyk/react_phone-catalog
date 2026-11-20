import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import style from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
