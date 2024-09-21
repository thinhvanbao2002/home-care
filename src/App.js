import './LoadingSpinner.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DefaultLayoutUser from './components/layout/user';
import Home from '~/pages/user/Home';
import UserProduct from './pages/user/Product';
import ProductDetail from './pages/user/ProductDetail';
import Cart from './pages/user/Cart';
import UserLogin from '~/pages/user/Login';
import Register from './pages/user/Register';
import ManagerLayout from '~/components/layout/manager';
import Overview from '~/pages/manager/Overview';
import Admin from '~/pages/manager/Admin';
import Product from './pages/manager/Product';
import Category from './pages/manager/Category';
import Inventory from './pages/manager/Inventory';
import Voucher from './pages/manager/Voucher';
import Gift from './pages/manager/Gift';
import New from './pages/manager/New';
import Notification from './pages/manager/Notification';
import Login from '~/pages/manager/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './redux/slide/authSlide';
import Order from './pages/user/Order';
import AdminOrder from './pages/manager/Order';
import Profile from './pages/user/Profile';
import SideberProfile from './components/layout/profile/sidebar';
import HeaderProfile from './components/layout/profile/header';
import ProfileLayout from './components/layout/profile';
import CustomerInfo from './pages/user/CustomerInfo';
import CustomerAddress from './pages/user/CustomerAddress';
import PurchaseOrder from './pages/user/PurchaseOrder';
import ChangePassword from './pages/user/ChangePassword';
import SuccessPage from './pages/user/OrderSuccess/Success';
import QrPaymen from './pages/user/QrPaymen';
import { setAuthAdmin } from './redux/slide/authAdminSlide';
import OrderLayout from './components/layout/order';
import User from './pages/manager/User';

function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminRoute = location.pathname.startsWith('/admin');
        const authDataAdmin = localStorage.getItem('authDataAdmin');

        if (isAdminRoute && !authDataAdmin) {
            navigate('/auth/a/login');
        } else {
            if (authDataAdmin) {
                dispatch(setAuthAdmin(authDataAdmin));
            }
        }
    }, [location, navigate, dispatch]);

    useEffect(() => {
        const authData = localStorage.getItem('authData');
        if (authData) {
            dispatch(setAuth(authData));
        }
    }, [dispatch]);

    useEffect(() => {
        const authData = localStorage.getItem('authDataAdmin');
        if (authData) {
            dispatch(setAuthAdmin(authData));
        }
    }, [dispatch]);

    // Theo dõi sự thay đổi location để bật/tắt loading
    useEffect(() => {
        setLoading(true); // Bật loading khi bắt đầu chuyển trang

        // Đặt một timeout nhỏ để giả lập thời gian tải
        const timer = setTimeout(() => {
            setLoading(false); // Tắt loading khi đã chuyển trang xong
        }, 300); // Bạn có thể điều chỉnh thời gian này theo ý muốn

        // Cleanup khi component unmount hoặc khi location thay đổi
        return () => clearTimeout(timer);
    }, [location]);

    const transitionPaths = ['/', '/products', '/product-detail', '/u/cart'];
    const shouldApplyTransition = transitionPaths.includes(location.pathname);

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-icon">
                        <i className="fa fa-spinner fa-spin"></i>
                    </div>
                </div>
            )}
            {shouldApplyTransition ? (
                <TransitionGroup>
                    <CSSTransition key={location.key} timeout={300} classNames="fade">
                        <Routes location={location}>
                            <Route path="/" element={<DefaultLayoutUser />}>
                                <Route index element={<Home />} />
                                <Route path="products" element={<UserProduct />} />
                                <Route path="product-detail" element={<ProductDetail />} />
                            </Route>
                            <Route path="order-success" element={<SuccessPage />} />
                            <Route path="u" element={<OrderLayout />}>
                                <Route path="cart" element={<Cart />} />
                                <Route path="order" element={<Order />} />
                                <Route path="qr-pay" element={<QrPaymen />} />
                            </Route>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            ) : (
                <Routes location={location}>
                    <Route path="/" element={<DefaultLayoutUser />}>
                        <Route index element={<Home />} />
                        <Route path="products" element={<UserProduct />} />
                        <Route path="product-detail" element={<ProductDetail />} />
                    </Route>
                    <Route path="order-success" element={<SuccessPage />} />
                    <Route path="u" element={<OrderLayout />}>
                        <Route path="cart" element={<Cart />} />
                        <Route path="order" element={<Order />} />
                        <Route path="qr-pay" element={<QrPaymen />} />
                    </Route>
                    <Route path="auth">
                        <Route path="login" element={<UserLogin />} />
                        <Route path="a/login" element={<Login />} />
                    </Route>
                    <Route path="admin" element={<ManagerLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="staff" element={<Admin />} />
                        <Route path="customers" element={<User />} />
                        <Route path="product" element={<Product />} />
                        <Route path="category" element={<Category />} />
                        <Route path="inventory" element={<Inventory />} />
                        <Route path="voucher" element={<Voucher />} />
                        <Route path="gift" element={<Gift />} />
                        <Route path="new" element={<New />} />
                        <Route path="notification" element={<Notification />} />
                        <Route path="order" element={<AdminOrder />} />
                    </Route>
                    <Route path="customer">
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="profile" element={<ProfileLayout />}>
                        <Route path="info-customer" element={<CustomerInfo />} />
                        <Route path="address-customer" element={<CustomerAddress />} />
                        <Route path="wallet-customer" element={<Profile />} />
                        <Route path="order-customer" element={<PurchaseOrder />} />
                        <Route path="change-password-customer" element={<ChangePassword />} />
                    </Route>

                    <Route path="test">
                        <Route path="sidebar" element={<SideberProfile />} />
                        <Route path="header" element={<HeaderProfile />} />
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default App;
