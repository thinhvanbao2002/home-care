// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from './redux/slide/couterSlide';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import DefaultLayoutUser from './components/layout/user';
import { Fragment } from 'react';
import Home from '~/pages/user/Home';
import ManagerLayout from '~/components/layout/manager';
import Admin from '~/pages/manager/Admin';
import Auth from '~/pages/manager/Auth';
import Overview from '~/pages/manager/Overview';
import User from './pages/manager/User';
import Product from './pages/manager/Product';
import UserProduct from './pages/user/Product';
import Category from './pages/manager/Category';
import Inventory from './pages/manager/Inventory';
import Voucher from './pages/manager/Voucher';
import Gift from './pages/manager/Gift';
import New from './pages/manager/New';
import Notification from './pages/manager/Notification';
import UserLogin from './pages/user/Login';
import Login from '~/pages/manager/Auth';
import Register from './pages/user/Register';
import Cart from './pages/user/Cart';
import ProductDetail from './pages/user/ProductDetail';
function App() {
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="" element={<DefaultLayoutUser />}>
                        <Route path="" element={<Home />} />
                        <Route path="products" element={<UserProduct />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="product-detail" element={<ProductDetail />} />
                    </Route>
                    <Route path="u">
                        <Route path="cart" element={<Cart />} />
                    </Route>
                    <Route path="auth">
                        <Route path="login" element={<UserLogin />} />
                        <Route path="a/login" element={<Login />} />
                        <Route path="products" element={<Admin />} />
                    </Route>
                    <Route path="admin" element={<ManagerLayout />}>
                        <Route path="" element={<Overview />} />
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
        </Router>
    );
}

export default App;
