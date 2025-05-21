import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import './layout.css'

function DefaultLayoutUser() {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayoutUser;
