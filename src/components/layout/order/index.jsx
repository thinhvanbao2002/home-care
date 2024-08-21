import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function OrderLayout() {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('Giỏ hàng');

    useEffect(() => {
        switch (location.pathname) {
            case '/u/cart':
                document.title = 'Giỏ hàng';
                setPageTitle('Giỏ hàng');
                break;
            case '/orders/checkout':
                document.title = 'Thanh toán';
                setPageTitle('Thanh toán');
                break;
            case '/orders/confirmation':
                document.title = 'Xác nhận đơn hàng';
                setPageTitle('Xác nhận đơn hàng');
                break;
            default:
                document.title = 'Giỏ hàng';
                setPageTitle('Giỏ hàng');
        }
    }, [location.pathname]);

    return (
        <>
            <div className="app">
                {/* <!-- Header --> */}
                <header className="header">
                    <div className="grid wide">
                        <div className="logo-cart">
                            <img src="/logo-homecare.jpg" alt="" />
                            <h1>{pageTitle}</h1>
                        </div>
                    </div>
                </header>
                <Outlet />
            </div>
        </>
    );
}

export default OrderLayout;
