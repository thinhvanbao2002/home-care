import Home from '~/pages/user/Home';
import ManagerLayout from '~/components/layout/manager';
import Admin from '~/pages/manager/Admin';
import Auth from '~/pages/manager/Auth';
export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Home },

    { path: '/admin', component: Admin, layout: ManagerLayout },
    { path: '/admin/auth', component: Auth, layout: null },
];

export const privateRoute = [];
