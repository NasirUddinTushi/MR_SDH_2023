import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '@/shared/Navbar/Navbar';
import Footer from '@/shared/footer/Footer';

const Layout = () => {
  const location = useLocation();

  // Pages where you don't want Navbar and Footer
  const hideLayout = ['/sign-in', '/sign-up'];

  const shouldHide = hideLayout.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHide && <Navbar />}
      <Outlet />

      {!shouldHide && <Footer />}
      <ScrollRestoration/>
    </>
  );
};

export default Layout;
