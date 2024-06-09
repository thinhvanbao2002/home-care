import Home from '~/pages/user/Home';
import Cart from '~/pages/user/Cart';
import ManagerLayout from '~/components/layout/manager';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart, layout: ManagerLayout },
];

export const privateRoute = [];
