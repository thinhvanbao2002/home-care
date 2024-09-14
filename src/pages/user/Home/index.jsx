import './styles/style.css';
import './styles/grid.css';
import './styles/responsive.css';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '~/services/user/product-service';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { fetchAllChildCategory } from '~/services/user/category-service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '~/services/user/cart-service';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [take, setTake] = useState(15);
    const [page, setPage] = useState(1);
    const [categoryId, setcategoryId] = useState(null);

    const auth = useSelector((state) => state?.auth?.user);

    const handleNavigate = (id) => {
        navigate('/product-detail', { state: { id } });
    };

    useEffect(() => {
        getAllProduct();
        getAllCategory();
    }, [currentPage, categoryId]);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct({ page: page, take, categoryId });
            setProducts(res.data); // Giả sử API trả về sản phẩm trong res.data.products
            setTotalPages(res.data.totalPages); // Giả sử API trả về tổng số trang
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCategory = async () => {
        try {
            const res = await fetchAllChildCategory();
            setCategories(res.data);
        } catch (error) {}
    };

    const handleOrder = (product, quantity = 1) => {
        try {
            if (Object.keys(auth).length !== 0) {
                const totalPrice = product.price * quantity;
                navigate('/u/order', {
                    state: { products: [{ ...product, quantity, totalPrice, product_id: product.id }] },
                });
            } else {
                openNotificationError('Thất bại!', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOrderMultiple = (cartItems) => {
        try {
            if (Object.keys(auth).length !== 0) {
                const products = cartItems.map((item) => ({
                    ...item.product,
                    quantity: item.quantity,
                    totalPrice: item.product.price * item.quantity,
                }));
                navigate('/u/order', { state: { products } });
            } else {
                openNotificationError('Thất bại!', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    //     import { useLocation } from 'react-router-dom';
    // import { formatNumber } from '~/components/common/ultils';

    // function OrderPage() {
    //     const location = useLocation();
    //     const products = location.state?.products || [];

    //     return (
    //         <div>
    //             <h1>Đặt Hàng</h1>
    //             {products.map((product, index) => (
    //                 <div key={index}>
    //                     <h2>{product.name}</h2>
    //                     <img src={product.image} alt={product.name} />
    //                     <p>Số lượng: {product.quantity}</p>
    //                     <p>Giá mỗi sản phẩm: {formatNumber(product.price)} VND</p>
    //                     <p>Tổng tiền: {formatNumber(product.totalPrice)} VND</p>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // }

    // export default OrderPage;

    const handleAddToCart = async (productId) => {
        try {
            if (Object.keys(auth).length !== 0) {
                await addToCart({ productId });
                openNotificationSuccess('Thành công!', 'Đã thêm sản phẩm vào giỏ hàng!');
            } else {
                openNotificationError('Thất bại!', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
                navigate('/auth/login');
            }
        } catch (error) {}
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return; // Đảm bảo trang hợp lệ
        setCurrentPage(page);
    };

    return (
        <>
            <header class="home-header">
                <div class="home-banner">
                    {/* <!-- Slide bên trái --> */}
                    <div class="home-slide-left">
                        {/* <button class="slide-btn prev-btn" onclick="changeSlide('left', -1)">
                            ‹
                        </button> */}
                        <img
                            id="slideLeft"
                            src="https://webmedia.com.vn/images/2020/05/banner-khuyen-mai-electrolux.jpg"
                            alt="Samsung Galaxy Z Flip6 Promotion"
                        />
                        {/* <button class="slide-btn next-btn" onclick="changeSlide('left', 1)">
                            ›
                        </button> */}
                    </div>

                    <div class="home-slide-right">
                        {/* <button class="slide-btn prev-btn" onclick="changeSlide('right', -1)">
                            ‹
                        </button> */}
                        <img
                            id="slideRight"
                            src="https://img.pikbest.com/templates/20240729/oil-free-fryer-product-catalog-banner-decorates-a-home-appliance-shop_10687341.jpg!w700wp"
                            alt="4G Promotion"
                        />
                        {/* <button class="slide-btn next-btn" onclick="changeSlide('right', 1)">
                            ›
                        </button> */}
                    </div>
                </div>

                <nav class="home-nav">
                    <button>Máy lọc S</button>
                    <button>Máy lọc A</button>
                    <button>Máy lọc M</button>
                    <button>Máy lọc Z</button>
                    <button>Máy lọc Z6 SERIES</button>
                </nav>

                <section class="home-promo">
                    <div style={{ marginBottom: '40px' }} class="home-promo-title">
                        <h2>🔥 SẢN PHẨM HOT 🔥</h2>
                    </div>
                    {/* <div class="home-promo-timer">
                        Kết thúc sau: <span>02 : 04 : 44 : 16</span>
                    </div> */}
                    <div class="home-promo-products">
                        <div class="home-promo-product">
                            <img src="/prd.webp" alt="Sản phẩm khuyến mãi 1" />
                            <h3>Máy lọc không khí X</h3>
                            <p>Giá: 4,000,000 VND</p>
                            <button class="add-to-cart-btn" onclick="addToCart('promo-product-1')">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div class="home-promo-product">
                            <img src="/prd.webp" alt="Sản phẩm khuyến mãi 2" />
                            <h3>Máy lọc không khí Y</h3>
                            <p>Giá: 4,500,000 VND</p>
                            <button class="add-to-cart-btn" onclick="addToCart('promo-product-2')">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div class="home-promo-product">
                            <img src="/prd.webp" alt="Sản phẩm khuyến mãi 3" />
                            <h3>Máy lọc không khí Z</h3>
                            <p>Giá: 5,000,000 VND</p>
                            <button class="add-to-cart-btn" onclick="addToCart('promo-product-3')">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div class="home-promo-product">
                            <img src="/prd.webp" alt="Sản phẩm khuyến mãi 4" />
                            <h3>Máy lọc không khí W</h3>
                            <p>Giá: 5,500,000 VND</p>
                            <button class="add-to-cart-btn" onclick="addToCart('promo-product-4')">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </section>
            </header>

            <section class="home-featured-products">
                <h2>Sản phẩm nổi bật</h2>
                {products &&
                    products.length > 0 &&
                    products.map((product, innex) => (
                        <div
                            onClick={() => {
                                handleNavigate(product.id);
                            }}
                            key={innex + 1}
                            class="home-product"
                        >
                            <img src={product?.image} alt="Sản phẩm 1" />
                            <h3
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px', // Tùy chỉnh chiều rộng để giới hạn kích thước
                                }}
                            >
                                {product?.name}
                            </h3>
                            <p>Giá: {formatNumber(Number(product?.price))} VND</p>
                        </div>
                    ))}
            </section>

            <section class="home-shop-intro">
                <h2>Giới thiệu về chúng tôi</h2>
                <p>
                    Chúng tôi cung cấp những sản phẩm máy lọc không khí tốt nhất để bảo vệ sức khỏe gia đình bạn. Hãy
                    khám phá các sản phẩm của chúng tôi để tận hưởng không khí trong lành mỗi ngày.
                </p>
            </section>
        </>
    );
}

export default Home;
