import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function OrderLayout() {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('Giỏ hàng');
    const navigate = useNavigate();

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
            case '/u/order':
                document.title = 'Đặt hàng';
                setPageTitle('Đặt hàng');
                break;
            case '/u/qr-pay':
                document.title = 'Thanh toán';
                setPageTitle('Thanh toán');
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
                            <img style={{width: 50}} onClick={() => navigate('/')} src="/logo-tl-house-v2.png" alt="" />
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
