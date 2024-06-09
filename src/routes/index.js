import Home from '~/pages/user/Home';
import Cart from '~/pages/user/Cart';
import ManagerLayout from '~/components/layout/manager';
import Admin from '~/pages/manager/Admin';
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin, layout: ManagerLayout },
];

export const privateRoute = [];
