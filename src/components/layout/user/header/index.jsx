import './header.css';
import './header-responsive.css';
import '../../../../assets/global-style/globalStyle.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllCategory } from '~/services/user/category-service';
import { fetchAllProduct } from '~/services/user/product-service';

function Header() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [categories, setCategories] = useState([]);
    const [childCategoies, setChildCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const handleNavigate = () => {
        navigate('/u/cart');
    };

    useEffect(() => {
        getAllCategory();
        getAllProduct();
    }, []);

    const getAllCategory = async () => {
        try {
            const res = await fetchAllCategory();
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMouseEnter = (item) => {
        setChildCategories(item.children);
    };

    return (
        <>
            <div className="wrapber">
                <header className="nav">
                    <div className="nav-left">
                        <div className="logo">
                            <img src="/logo-homecare.jpg" alt="" className="logo-img" />
                        </div>
                        {categories &&
                            categories.length > 0 &&
                            categories.map((item) => (
                                <ul className="nav-list">
                                    <li className="nav-item">
                                        <Link
                                            onMouseEnter={() => handleMouseEnter(item)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            href=""
                                            className="nav-text"
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="menu-container">
                                            <div className="menu-container-left">
                                                <ul className="menu-list">
                                                    {childCategoies &&
                                                        childCategoies &&
                                                        childCategoies.map((child) => (
                                                            <li className="menu-item">
                                                                <a href="" className="menu-text">
                                                                    {child.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>

                                            <div className="menu-container-right">
                                                <h2>SẢN PHẨM MỚI NHẤT</h2>
                                                <ul className="menu-list-1">
                                                    {products &&
                                                        products.length > 0 &&
                                                        products.map((p) => (
                                                            <li className="menu-item">
                                                                <div href="" className="menu-text">
                                                                    <img
                                                                        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-10.jpg"
                                                                        alt=""
                                                                        className="menu-img"
                                                                    />
                                                                    <span>{p.name}</span>
                                                                </div>
                                                                <span className="new">Mới</span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                    </div>
                    <div className="nav-right">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <a href="" className="nav-text">
                                    Hỗ trợ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="nav-text">
                                    Doanh nghiệp
                                </a>
                            </li>
                        </ul>

                        <ul className="icon-list">
                            <li id="searchs" className="icon-item">
                                <p href="" className="icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                    </svg>
                                </p>
                            </li>

                            <li className="icon-item" onClick={() => handleNavigate()}>
                                <a href="" className="icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                    </svg>
                                </a>
                                <span className="cart-notice">8</span>
                            </li>

                            <li className="icon-item">
                                <Link to="/auth/login" className="icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                </Link>
                            </li>

                            <li id="bar-mobile" className="icon-item">
                                <a href="#" className="icon-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>

            <div className="nav-mobile">
                <div className="wb-nav-mobile">
                    <div className="container-nav-mobile">
                        <header className="mobile-header">
                            <div className="search-mobile">
                                <div className="button-search-mb button-search-tabl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                    </svg>
                                </div>

                                <div id="xmark-mobile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                                    </svg>
                                </div>
                            </div>
                        </header>

                        <section className="login-mobile">
                            <h3>Đăng nhập/Đăng ký</h3>
                        </section>

                        <section className="menu-mobile_1">
                            <ul className="menu-mobile_list">
                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <p>Máy lọc không khí</p>
                                        <svg
                                            className="icon-plus active"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                        </svg>
                                        <svg
                                            className="icon-minus"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                        </svg>
                                    </a>
                                    <ul className="menu-mobile_list-drop_down">
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                        <li>hhhhhhhhhh</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>

            <section className="search">
                <div className="wrapber-search">
                    <div className="dimmed-search">
                        <div id="xmark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                        <div className="content-search">
                            <h2 className="text-search">Chúng tôi có thể giúp bạn tìm kiếm ?</h2>
                            <div className="box-search">
                                <div className="form-search">
                                    <form action="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                        </svg>
                                        <input type="search" placeholder="search..." />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Header;
