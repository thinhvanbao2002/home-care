import React, { useState, useRef, useEffect } from 'react';
import './productDetail.css'; // Đảm bảo rằng bạn đã tạo và liên kết tệp CSS
import './grid.css';
import parse from 'html-react-parser';
import { useLocation } from 'react-router-dom';
import { getDetailProduct } from '~/services/user/product-service';
import { formatNumber, openNotificationSuccess } from '~/components/common/ultils';
import { addToCart } from '~/services/user/cart-service';

function ProductDetail() {
    const location = useLocation();
    const [mainImage, setMainImage] = useState(
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const productContentRef = useRef(null);
    // const [productId, setProductId] = useState(location.state?.id);
    const [product, setProduct] = useState({});

    const productId = location.state?.id;

    useEffect(() => {
        if (product) {
            getDetail();
        }
    }, [productId]);

    const getDetail = async () => {
        try {
            const res = await getDetailProduct(productId);
            setProduct(res?.data);
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
            await addToCart({ productId });
            openNotificationSuccess('Thành công', 'Đã thêm sản phẩm vào giỏ hàng!');
        } catch (error) {}
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
                            <button style={{ borderRadius: '15px' }} className="buy-button">
                                MUA NGAY
                            </button>
                            <button
                                onClick={handleAddToCart}
                                style={{ borderRadius: '15px' }}
                                className="add-to-cart-button"
                            >
                                Thêm giỏ hàng
                            </button>
                            <button style={{ borderRadius: '15px' }} className="installment-button">
                                Mua trả góp
                            </button>
                            <button style={{ borderRadius: '15px' }} className="installment-card-button">
                                Mua trả góp bằng thẻ
                            </button>
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
                        <p>123 Đường XYZ, Quận ABC, Thành phố DEF, Việt Nam</p>
                    </div>

                    <div className="customer-reviews">
                        <h2>Bình luận của khách hàng</h2>
                        <div className="comment-form">
                            <h3>Gửi bình luận của bạn</h3>
                            <form id="commentForm">
                                <label htmlFor="name">Tên:</label>
                                <input type="text" id="name" name="name" required />

                                <label htmlFor="phone">Số điện thoại:</label>
                                <input type="tel" id="phone" name="phone" required />

                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />

                                <label htmlFor="comment">Nội dung bình luận:</label>
                                <textarea id="comment" name="comment" rows="4" required></textarea>

                                <button type="submit" className="submit-comment-button">
                                    Gửi bình luận
                                </button>
                            </form>
                        </div>

                        <div className="reviews-list">
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
