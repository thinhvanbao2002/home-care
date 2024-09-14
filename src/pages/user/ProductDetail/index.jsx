import React, { useState, useRef, useEffect } from 'react';
import './productDetail.css'; // Đảm bảo rằng bạn đã tạo và liên kết tệp CSS
import './grid.css';
import parse from 'html-react-parser';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDetailProduct } from '~/services/user/product-service';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { addToCart } from '~/services/user/cart-service';
import { useSelector } from 'react-redux';
import { fetchAllProductReview, reviewProduct } from '~/services/user/product-review.service';
import moment from 'moment';

function ProductDetail() {
    const location = useLocation();
    const [mainImage, setMainImage] = useState(
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const productContentRef = useRef(null);
    // const [productId, setProductId] = useState(location.state?.id);
    const [product, setProduct] = useState({});
    const [productReview, SetProductReview] = useState([]);
    const [review, setReview] = useState('');
    const navigate = useNavigate();
    const productId = location.state?.id;

    const auth = useSelector((state) => state.auth.user);

    const userAuth = typeof auth === 'string' ? JSON.parse(auth) : auth;

    useEffect(() => {
        if (product) {
            getDetail();
            getAllReview();
        }
        // window.scrollTo(0, 0);
    }, [productId]);

    const getDetail = async () => {
        try {
            const res = await getDetailProduct(productId);
            setProduct(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllReview = async () => {
        try {
            const res = await fetchAllProductReview({ productId });
            SetProductReview(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const changeImage = (src) => {
        setMainImage(src);
    };

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAddToCart = async () => {
        try {
            if (Object.keys(auth).length !== 0) {
                await addToCart({ productId });
                openNotificationSuccess('Thành công', 'Đã thêm sản phẩm vào giỏ hàng!');
            } else {
                openNotificationError('Thất bại', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
                navigate('/auth/login');
            }
        } catch (error) {
            openNotificationError('Thất bại!', error.response.data.message);
        }
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

    const handleCreateReview = async () => {
        try {
            await reviewProduct({ productId, review });
            getAllReview();
            setReview('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app-prod">
            <header className="header-prod">
                <div className="grid wide">
                    <div className="product-container">
                        <div className="product-image-gallery">
                            <div className="main-image">
                                <img src={product?.image} alt="Product" id="main-product-image" />
                            </div>
                            <div className="image-thumbnails">
                                {product &&
                                    product?.product_photo &&
                                    product?.product_photo.length > 0 &&
                                    product?.product_photo.map((p) => (
                                        <img
                                            src={p.url}
                                            alt="Front View"
                                            onClick={() =>
                                                changeImage(
                                                    'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
                                                )
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="product-details">
                            <h1>{product.name}</h1>
                            <p className="price">
                                {formatNumber(Number(product?.price))} ₫ <span className="old-price">4,790,000 ₫</span>
                            </p>
                            <div className="colors">
                                <button className="color-button black"></button>
                                <button className="color-button yellow selected"></button>
                            </div>
                            <button
                                onClick={() => handleOrder(product)}
                                style={{ borderRadius: '15px', width: '100%' }}
                                className="buy-button"
                            >
                                MUA NGAY
                            </button>
                            <button
                                onClick={handleAddToCart}
                                style={{ borderRadius: '15px' }}
                                className="add-to-cart-button"
                            >
                                Thêm giỏ hàng
                            </button>
                            {/* <button style={{ borderRadius: '15px' }} className="installment-button">
                                Mua trả góp
                            </button>
                            <button style={{ borderRadius: '15px' }} className="installment-card-button">
                                Mua trả góp bằng thẻ
                            </button> */}
                            <div className="promotions">
                                <div className="additional-offers">
                                    <p>
                                        <strong>Ưu đãi thêm:</strong>
                                    </p>
                                    <ul>
                                        <li>Miễn phí giao hàng toàn quốc</li>
                                        <li>Đổi trả trong vòng 30 ngày</li>
                                    </ul>
                                </div>
                                <div className="promotions-list">
                                    <p>
                                        <strong>Khuyến mãi:</strong>
                                    </p>
                                    <ul>
                                        <li>Giảm 1% tối đa 100.000₫ khi thanh toán qua ZaloPay</li>
                                        <li>Giảm 1% tối đa 300.000₫ khi thanh toán qua VNPay</li>
                                        <li>Trả góp 0%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="product-info">
                <div className="grid wide">
                    <div className="product-details-section">
                        <h2>Thông tin sản phẩm</h2>
                        <div className={`product-content ${isExpanded ? 'expanded' : ''}`} ref={productContentRef}>
                            {parse(String(product.description))}
                        </div>
                        <button className="toggle-content-button" onClick={toggleContent}>
                            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>

                    <div className="technical-specs">
                        <h2>Thông số kỹ thuật</h2>
                        {product.feature}
                    </div>

                    <div className="shop-address">
                        <h2>Địa chỉ cửa hàng</h2>
                        <p>299 Trung Kính, phường Yên Hòa, quận Cầu Giấy, thành phố Hà Nội, Việt Nam</p>
                    </div>

                    <div className="customer-reviews">
                        <h2>Bình luận của khách hàng</h2>
                        <div className="comment-form">
                            {/* <h3>Gửi bình luận của bạn</h3> */}
                            {/* <label htmlFor="name">Tên:</label>
                                <input type="text" id="name" name="name" required />

                                <label htmlFor="phone">Số điện thoại:</label>
                                <input type="tel" id="phone" name="phone" required />

                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required /> */}

                            <label htmlFor="comment">Nội dung bình luận:</label>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                id="comment"
                                name="comment"
                                rows="4"
                                required
                            ></textarea>

                            <button onClick={handleCreateReview} type="submit" className="submit-comment-button">
                                Gửi bình luận
                            </button>
                        </div>

                        <div className="reviews-list">
                            {productReview &&
                                productReview.length > 0 &&
                                productReview.map((item, index) => (
                                    <div key={index + 1} className="review">
                                        <span>
                                            <img
                                                src={
                                                    item?.customer?.user?.avatar
                                                        ? item?.customer?.user?.avatar
                                                        : '/user.png'
                                                }
                                                alt=""
                                            />
                                            <div>
                                                <h4>{item?.customer?.user?.name}</h4>
                                                <p>{moment(item?.created_at).format('DD-MM-YYYY HH:mm')}</p>
                                            </div>
                                        </span>
                                        <p>{item?.review}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
