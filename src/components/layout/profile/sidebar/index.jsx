import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

function SideberProfile() {
    const auth = useSelector((state) => state?.auth?.user);
    const authJson = typeof auth === 'string' ? JSON.parse(auth) : auth;
    const location = useLocation(); // Get the current route location

    return (
        <>
            <div className="sidebar-profile">
                <div className="profile-info">
                    <img src={authJson.avatar} alt="Profile Picture" />
                    <p className="username">{authJson.name}</p>
                    <Link to="/" className="edit-profile">
                        Về trang chủ
                    </Link>
                </div>
                <nav className="menu">
                    <ul>
                        <li className={`menu-item ${location.pathname === '/profile/info' ? 'active' : ''}`}>
                            <Link to="/profile/info-customer">Hồ Sơ</Link>
                        </li>

                        <li
                            className={`menu-item ${location.pathname === '/profile/address-customer' ? 'active' : ''}`}
                        >
                            <Link to="/profile/address-customer">Địa Chỉ</Link>
                        </li>
                        <li className={`menu-item ${location.pathname === '/profile/change-password' ? 'active' : ''}`}>
                            <Link to="/profile/change-password-customer">Đổi Mật Khẩu</Link>
                        </li>

                        <li className={`menu-item ${location.pathname === '/profile/orders' ? 'active' : ''}`}>
                            <Link to="/profile/order-customer">Đơn Mua</Link>
                        </li>
                        {/* <li className={`menu-item ${location.pathname === '/profile/notifications' ? 'active' : ''}`}>
                            <Link to="/profile/notifications">Thông Báo</Link>
                        </li> */}
                        {/* <li className={`menu-item ${location.pathname === '/profile/vouchers' ? 'active' : ''}`}>
                            <Link to="/profile/vouchers">Kho Voucher</Link>
                        </li>
                        <li className={`menu-item ${location.pathname === '/profile/shopee-xu' ? 'active' : ''}`}>
                            <Link to="/profile/shopee-xu">Shopee Xu</Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SideberProfile;
