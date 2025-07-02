import './styles/style.css';
import './styles/grid.css';
import React from 'react';
import './styles/responsive.css';
import { useEffect, useState } from 'react';
import { fetchAllProduct, fetchBestSeller } from '~/services/user/product-service';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { fetchAllChildCategory } from '~/services/user/category-service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '~/services/user/cart-service';
import { Carousel } from 'antd';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [take, setTake] = useState(15);
  const [page, setPage] = useState(1);
  const [categoryId, setcategoryId] = useState(null);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useSelector((state) => state?.auth?.user);

  const handleNavigate = (id) => {
    navigate('/product-detail', { state: { id } });
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
    getAllBestSeller();
  }, [currentPage, categoryId]);

  const getAllProduct = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAllProduct({ page: page, take, categoryId });
      setProducts(res.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await fetchAllChildCategory();
      setCategories(res.data);
    } catch (error) { }
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

  const getAllBestSeller = async () => {
    try {
      const res = await fetchBestSeller();
      setBestSeller(res?.data);
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

  const handleAddToCart = async (productId) => {
    try {
      if (Object.keys(auth).length !== 0) {
        await addToCart({ productId });
        openNotificationSuccess('Thành công!', 'Đã thêm sản phẩm vào giỏ hàng!');
      } else {
        openNotificationError('Thất bại!', 'Vui lòng đăng nhập để sử dụng dịch vụ!');
        navigate('/auth/login');
      }
    } catch (error) {
      openNotificationError('Thất bại', 'Sản phẩm hiện không đủ hàng vui lòng chọn sản phẩm khác!');
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải trang chủ...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <Carousel autoplay effect="fade" className="hero-carousel">
          <div className="carousel-item">
            <img
              src="https://giadungviet888.rf.gd/wp-content/uploads/2024/03/mau-banner-quang-cao-dien-may_033707028-1400x575.jpg"
              alt="Banner 1"
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="carousel-content">
                {/* <h1 className="carousel-title">Máy Lọc Không Khí Chất Lượng Cao</h1>
                <p className="carousel-subtitle">Bảo vệ sức khỏe gia đình bạn với công nghệ tiên tiến</p>
                <button className="carousel-cta">Khám phá ngay</button> */}
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img6.thuthuatphanmem.vn/uploads/2023/04/13/hinh-anh-bia-do-gia-dung-cuc-dep_075602442.jpg"
              alt="Banner 2"
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="carousel-content">
                {/* <h1 className="carousel-title">Giải Pháp Lọc Không Khí Toàn Diện</h1>
                <p className="carousel-subtitle">Đem lại không gian sống trong lành cho mọi gia đình</p>
                <button className="carousel-cta">Mua ngay</button> */}
              </div>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Giao hàng miễn phí</h3>
              <p>Giao hàng toàn quốc miễn phí cho đơn hàng từ 500k</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Đổi trả 30 ngày</h3>
              <p>Đổi trả miễn phí trong vòng 30 ngày</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h3>Bảo hành chính hãng</h3>
              <p>Bảo hành chính hãng từ 12-24 tháng</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💬</div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Hỗ trợ khách hàng 24/7 qua hotline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-item">
              <img
                src="https://salt.tikicdn.com/cache/w700/ts/tmp/93/13/11/d12552e567a71b516f365578a2d70af1.jpg.webp"
                alt="Promotion 1"
                className="banner-image"
              />
              <div className="banner-overlay">
                <h3>Khuyến mãi đặc biệt</h3>
                <p>Giảm giá lên đến 50%</p>
              </div>
            </div>
            <div className="banner-item">
              <img
                src="https://salt.tikicdn.com/cache/w700/ts/tmp/a7/80/ed/dcf7bea89be0faffd27d3d504c62b4ff.jpg.webp"
                alt="Promotion 2"
                className="banner-image"
              />
              <div className="banner-overlay">
                <h3>Sản phẩm mới</h3>
                <p>Khám phá ngay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Products Section */}
      {/* <section className="hot-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">🔥</span>
              SẢN PHẨM HOT
            </h2>
            <p className="section-subtitle">Những sản phẩm bán chạy nhất tuần này</p>
          </div>

          <div className="products-grid">
            {bestSeller && bestSeller.length > 0 ? (
              bestSeller.map((item, index) => (
                <div key={index} className="product-card hot-product">
                  <div className="product-image-container">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="product-image"
                    />
                    <div className="product-overlay">
                      <button
                        onClick={() => handleAddToCart(item?.id)}
                        className="quick-add-btn"
                      >
                        <span className="btn-icon">🛒</span>
                        Thêm vào giỏ
                      </button>
                    </div>
                    <div className="product-badge">
                      <span className="badge-hot">HOT</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item?.name}</h3>
                    <div className="product-price">
                      <span className="current-price">{formatNumber(Number(item?.price))} ₫</span>
                      <span className="old-price">{formatNumber(Number(item?.price) * 1.2)} ₫</span>
                    </div>
                    <div className="product-rating">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="star">⭐</span>
                        ))}
                      </div>
                      <span className="rating-count">(4.8)</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">📦</div>
                <p>Chưa có sản phẩm hot</p>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Categories Section */}
      {/* <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">📂</span>
              DANH MỤC SẢN PHẨM
            </h2>
            <p className="section-subtitle">Khám phá các danh mục sản phẩm đa dạng</p>
          </div>

          <div className="categories-grid">
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">🏷️</div>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description || 'Khám phá ngay'}</p>
                </div>
              ))
            ) : (
              <div className="no-categories">
                <div className="no-categories-icon">📁</div>
                <p>Chưa có danh mục</p>
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⭐</span>
              SẢN PHẨM NỔI BẬT
            </h2>
            <p className="section-subtitle">Những sản phẩm chất lượng cao được khách hàng tin tưởng</p>
          </div>

          <div className="products-grid">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="product-card featured-product"
                  onClick={() => handleNavigate(product.id)}
                >
                  <div className="product-image-container">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="product-image"
                    />
                    <div className="product-overlay">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product?.id);
                        }}
                        className="quick-add-btn"
                      >
                        <span className="btn-icon">🛒</span>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product?.name}</h3>
                    <div className="product-price">
                      <span className="current-price">{formatNumber(Number(product?.price))} ₫</span>
                    </div>
                    <div className="product-rating">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="star">⭐</span>
                        ))}
                      </div>
                      <span className="rating-count">(4.5)</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">📦</div>
                <p>Chưa có sản phẩm</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">Về Chúng Tôi</h2>
              <p className="about-description">
                Chúng tôi là đơn vị tiên phong trong lĩnh vực cung cấp các giải pháp lọc không khí chất lượng cao.
                Với nhiều năm kinh nghiệm và đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến những
                sản phẩm tốt nhất để bảo vệ sức khỏe gia đình bạn.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">✅</span>
                  <span>Chất lượng đảm bảo</span>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🚚</span>
                  <span>Giao hàng nhanh chóng</span>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">🛡️</span>
                  <span>Bảo hành chính hãng</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img
                src="https://img6.thuthuatphanmem.vn/uploads/2023/04/13/hinh-anh-bia-do-gia-dung-cuc-dep_075602442.jpg"
                alt="Về chúng tôi"
                className="about-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Đăng Ký Nhận Tin</h2>
            <p className="newsletter-description">
              Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="newsletter-input"
              />
              <button className="newsletter-btn">Đăng ký</button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
