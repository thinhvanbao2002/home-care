import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import LoadingSpinner from './LoadingSpinner'; // Import LoadingSpinner
import User from './pages/manager/User';
import OrderLayout from './components/layout/order';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './redux/slide/authSlide';

function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch(); // Initialize useDispatch

    console.log(auth);

    useEffect(() => {
        // Check if the route is a user route
        const isUserRoute = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/auth');

        if (isUserRoute) {
            // Start loading for user routes
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 300); // Simulate loading time
            return () => clearTimeout(timer);
        } else {
            // Immediately set loading to false for admin routes
            setLoading(false);
        }
    }, [location]);

    useEffect(() => {
        // Giả sử bạn muốn lấy dữ liệu đăng nhập từ localStorage và lưu vào Redux
        const authData = localStorage.getItem('authData');
        if (authData) {
            dispatch(setAuth(authData)); // Lưu vào Redux
        }
    }, [dispatch]); // Chỉ chạy một lần khi component được mount

    return (
        <>
            {loading && <LoadingSpinner />}
            <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                    <div>
                        <Routes location={location}>
                            <Route path="/" element={<DefaultLayoutUser />}>
                                <Route index element={<Home />} />
                                <Route path="products" element={<UserProduct />} />
                                <Route path="product-detail" element={<ProductDetail />} />
                            </Route>
                            <Route path="u" element={<OrderLayout />}>
                                <Route path="cart" element={<Cart />} />
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
                            </Route>
                            <Route path="customer">
                                <Route path="register" element={<Register />} />
                            </Route>
                        </Routes>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default App;
