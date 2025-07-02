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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const productContentRef = useRef(null);
  const [product, setProduct] = useState({});
  const [productReview, SetProductReview] = useState([]);
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const productId = location.state?.id;

  const auth = useSelector((state) => state.auth.user);
  const userAuth = typeof auth === 'string' ? JSON.parse(auth) : auth;

  useEffect(() => {
    getDetail();
    getAllReview();
    // window.scrollTo(0, 0);
  }, [productId]);

  const getDetail = async () => {
    try {
      setIsLoading(true);
      const res = await getDetailProduct(productId);
      setProduct(res?.data);
      if (res?.data?.product_photo?.length > 0) {
        setMainImage(res.data.product_photo[0].url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

  const changeImage = (src, index) => {
    setMainImage(src);
    setSelectedThumbnail(index);
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
        if (product.quantity >= quantity) {
          const totalPrice = product.price * quantity;
          navigate('/u/order', {
            state: { products: [{ ...product, quantity, totalPrice, product_id: product.id }] },
          });
        } else {
          openNotificationError('Thất bại!', 'Số lượng sản phẩm hiện không đủ!');
        }
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
      if (Object.keys(auth).length !== 0) {
        await reviewProduct({ productId, review });
        getAllReview();
        setReview('');
      } else {
        openNotificationError('Thất bại!', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
        navigate('/auth/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="app-prod">
      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="modal-content">
            <img src={mainImage} alt="Product" />
            <button className="close-modal" onClick={() => setShowImageModal(false)}>×</button>
          </div>
        </div>
      )}

      <header className="header-prod">
        <div className="grid wide">
          <div className="product-container">
            <div className="product-image-gallery">
              <div className="main-image-container">
                <div className="main-image" onClick={() => setShowImageModal(true)}>
                  <img src={mainImage} alt="Product" id="main-product-image" />
                  <div className="zoom-overlay">
                    <span>🔍 Click để phóng to</span>
                  </div>
                </div>
                <div className="image-badge">
                  <span className="badge-new">Mới</span>
                  <span className="badge-hot">Hot</span>
                </div>
              </div>
              <div className="image-thumbnails">
                {product &&
                  product.product_photo &&
                  product.product_photo.length > 0 &&
                  product.product_photo.map((p, index) => (
                    <div
                      key={p.id}
                      className={`thumbnail-container ${selectedThumbnail === index ? 'active' : ''}`}
                      onClick={() => changeImage(p.url, index)}
                    >
                      <img
                        src={p.url}
                        alt="Thumbnail"
                        className="thumbnail-image"
                      />
                      <div className="thumbnail-overlay"></div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="product-details">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star">⭐</span>
                    ))}
                  </div>
                  <span className="rating-text">(4.8/5 - {productReview.length} đánh giá)</span>
                </div>
              </div>

              <div className="price-section">
                <p className="current-price">{formatNumber(Number(product?.price))} ₫</p>
                <p className="old-price">{formatNumber(Number(product?.price) * 1.2)} ₫</p>
                <span className="discount-badge">-20%</span>
              </div>

              <div className="product-stats">
                <div className="stat-item">
                  <span className="stat-icon">📦</span>
                  <span className="stat-text">Còn {product.quantity || 0} sản phẩm</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🚚</span>
                  <span className="stat-text">Giao hàng miễn phí</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🔄</span>
                  <span className="stat-text">Đổi trả 30 ngày</span>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={() => handleOrder(product)}
                  className="buy-button pulse-animation"
                >
                  <span className="button-icon">🛒</span>
                  MUA NGAY
                </button>
                <button
                  onClick={handleAddToCart}
                  className="add-to-cart-button"
                >
                  <span className="button-icon">➕</span>
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>

              <div className="promotions">
                <div className="promotion-header">
                  <h3>🎁 Ưu đãi đặc biệt</h3>
                </div>
                <div className="additional-offers">
                  <div className="offer-item">
                    <span className="offer-icon">🎯</span>
                    <span>Miễn phí giao hàng toàn quốc</span>
                  </div>
                  <div className="offer-item">
                    <span className="offer-icon">🔄</span>
                    <span>Đổi trả trong vòng 30 ngày</span>
                  </div>
                </div>
                <div className="promotions-list">
                  <div className="promotion-item">
                    <span className="promotion-icon">💳</span>
                    <span>Giảm 1% tối đa 100.000₫ khi thanh toán qua ZaloPay</span>
                  </div>
                  <div className="promotion-item">
                    <span className="promotion-icon">🏦</span>
                    <span>Giảm 1% tối đa 300.000₫ khi thanh toán qua VNPay</span>
                  </div>
                  <div className="promotion-item">
                    <span className="promotion-icon">💳</span>
                    <span>Trả góp 0% lãi suất</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="product-info">
        <div className="grid wide">
          <div className="product-details-section">
            <h2 className="section-title">
              <span className="title-icon">📋</span>
              Thông tin sản phẩm
            </h2>
            <div className={`product-content ${isExpanded ? 'expanded' : ''}`} ref={productContentRef}>
              {parse(String(product.description))}
            </div>
            <button className="toggle-content-button" onClick={toggleContent}>
              <span className="toggle-icon">{isExpanded ? '▲' : '▼'}</span>
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>

          <div className="technical-specs">
            <h2 className="section-title">
              <span className="title-icon">⚙️</span>
              Thông số kỹ thuật
            </h2>
            <div className="specs-content">
              {product.feature}
            </div>
          </div>

          <div className="shop-address">
            <h2 className="section-title">
              <span className="title-icon">📍</span>
              Địa chỉ cửa hàng
            </h2>
            <div className="address-content">
              <div className="address-icon">🏪</div>
              <p>299 Trung Kính, phường Yên Hòa, quận Cầu Giấy, thành phố Hà Nội, Việt Nam</p>
            </div>
          </div>

          <div className="customer-reviews">
            <h2 className="section-title">
              <span className="title-icon">💬</span>
              Bình luận của khách hàng
            </h2>

            <div className="comment-form">
              <div className="form-header">
                <label htmlFor="comment">Viết bình luận của bạn:</label>
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                id="comment"
                name="comment"
                rows="4"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                required
              ></textarea>
              <button onClick={handleCreateReview} type="submit" className="submit-comment-button">
                <span className="button-icon">📤</span>
                Gửi bình luận
              </button>
            </div>

            <div className="reviews-list">
              {productReview && productReview.length > 0 ? (
                productReview.map((item, index) => (
                  <div key={index + 1} className="review">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <img
                          src={
                            item?.customer?.user?.avatar
                              ? item?.customer?.user?.avatar
                              : '/user.png'
                          }
                          alt=""
                          className="reviewer-avatar"
                        />
                        <div className="reviewer-details">
                          <h4 className="reviewer-name">{item?.customer?.user?.name}</h4>
                          <p className="review-date">{moment(item?.created_at).format('DD-MM-YYYY HH:mm')}</p>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="star">⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="review-content">{item?.review}</p>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <div className="no-reviews-icon">💭</div>
                  <p>Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
