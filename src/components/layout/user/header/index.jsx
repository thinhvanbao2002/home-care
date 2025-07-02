import './header.css';
import './header-responsive.css';
import '../../../../assets/global-style/globalStyle.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchAllCategory } from '~/services/user/category-service';
import { fetchAllProduct } from '~/services/user/product-service';
import { useSelector } from 'react-redux';
import { store } from '~/redux/store/store';
import { setAuth } from '~/redux/slide/authSlide';
import { openNotificationSuccess } from '~/components/common/ultils';
import { getAllCart } from '~/services/user/cart-service';

function Header() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState([]);
  console.log("🚀 ~ Header ~ categories:", categories)
  const [childCategoies, setChildCategories] = useState([]);
  const [allProducts, setAllProducts] = useState({}); // Lưu trữ sản phẩm theo category
  console.log("🚀 ~ Header ~ allProducts:", allProducts)
  const [countCart, setCountCart] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  const auth = useSelector((state) => state.auth.user);
  const userAuth = typeof auth === 'string' ? JSON.parse(auth) : auth;

  const handleNavigateProductDetail = (id) => {
    navigate('/product-detail', { state: { id } });
  };

  const handleNavigate = () => {
    navigate('/u/cart');
  };

  useEffect(() => {
    getAllCategory();
    handleCountCart();

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const getAllCategory = async () => {
    try {
      const res = await fetchAllCategory();
      setCategories(res.data);

      // Lấy sản phẩm cho từng category
      const productsByCategory = {};
      for (const category of res.data) {
        try {
          const productRes = await fetchAllProduct({
            page: 1,
            take: 6,
          });
          console.log("🚀 ~ getAllCategory ~ productRes:", productRes)
          productsByCategory[category.id] = productRes.data || [];
        } catch (error) {
          console.log(`Error fetching products for category ${category.id}:`, error);
          productsByCategory[category.id] = [];
        }
      }
      console.log("🚀 ~ getAllCategory ~ productsByCategory:", productsByCategory)
      setAllProducts(productsByCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountCart = async () => {
    try {
      const res = await getAllCart();
      setCountCart(res?.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (item) => {
    setChildCategories(item.children);
    setCurrentCategory(item);
  };

  const handleLogout = () => {
    localStorage.removeItem('authData');
    localStorage.removeItem('user-token');
    store.dispatch(setAuth({}));
    openNotificationSuccess('Thành công', 'Đăng xuất thành công');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Lấy sản phẩm của category hiện tại
  const getCurrentCategoryProducts = () => {
    if (!currentCategory) return [];
    return allProducts[currentCategory.id] || [];
  };

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={toggleSearch}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <h2>🔍 Tìm kiếm sản phẩm</h2>
              <button className="close-search" onClick={toggleSearch}>
                <span>×</span>
              </button>
            </div>
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm bạn muốn tìm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-submit">
                  <span className="search-icon">🔍</span>
                </button>
              </div>
            </form>
            <div className="search-suggestions">
              <h3>Gợi ý tìm kiếm:</h3>
              <div className="suggestion-tags">
                <span className="suggestion-tag">Máy lọc không khí</span>
                <span className="suggestion-tag">Máy hút ẩm</span>
                <span className="suggestion-tag">Máy tạo ẩm</span>
                <span className="suggestion-tag">Quạt điều hòa</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <header className="header">
          <div className="header-container">
            {/* Logo Section */}
            <div className="header-logo" onClick={() => navigate('/')}>
              <img src="/logo-tl-house-v2.png" alt="TL House" className="logo-image" />
              <div className="logo-text">
                <span className="logo-title">TL House</span>
                <span className="logo-subtitle">Chất lượng - Uy tín</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="header-nav">
              <ul className="nav-menu">
                {categories && categories.length > 0 && categories.map((item, index) => (
                  <li key={index} className="nav-item">
                    <div
                      className="nav-link"
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span className="nav-text">{item.name}</span>
                      <span className="nav-arrow">▼</span>

                      {/* Mega Menu */}
                      <div className="mega-menu">
                        <div className="mega-menu-content">
                          <div className="mega-menu-left">
                            <h3 className="mega-menu-title">{item.name}</h3>
                            <ul className="mega-menu-list">
                              {childCategoies && childCategoies.map((child, childIndex) => (
                                <li key={childIndex} className="mega-menu-item">
                                  <Link
                                    to="/products"
                                    onClick={() => navigate('/products', { state: { categoryId: child.id } })}
                                    className="mega-menu-link"
                                  >
                                    <span className="menu-icon">📁</span>
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Search Button */}
              <button className="action-btn search-btn" onClick={toggleSearch}>
                <span className="action-icon">🔍</span>
                <span className="action-text">Tìm kiếm</span>
              </button>

              {/* Support Button */}
              <button className="action-btn support-btn">
                <span className="action-icon">💬</span>
                <span className="action-text">Hỗ trợ</span>
              </button>

              {/* Cart Button */}
              <button className="action-btn cart-btn" onClick={handleNavigate}>
                <span className="action-icon">🛒</span>
                <span className="action-text">Giỏ hàng</span>
                {countCart > 0 && (
                  <span className="cart-badge">{countCart}</span>
                )}
              </button>

              {/* User Menu */}
              <div className="user-menu" ref={userMenuRef}>
                <div className="user-avatar" onClick={() => setIsUserDropdownOpen((v) => !v)} style={{ cursor: 'pointer' }}>
                  {Object.keys(userAuth).length !== 0 ? (
                    <img
                      src={userAuth?.avatar ? userAuth?.avatar : '/user.png'}
                      alt="User Avatar"
                      className="avatar-image"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <span className="avatar-icon">👤</span>
                    </div>
                  )}
                </div>
                {/* User Dropdown */}
                <div className={`user-dropdown${isUserDropdownOpen ? ' show' : ''}`}>
                  {Object.keys(userAuth).length !== 0 ? (
                    <>
                      <div className="dropdown-header">
                        <img
                          src={userAuth?.avatar ? userAuth?.avatar : '/user.png'}
                          alt="User"
                          className="dropdown-avatar"
                        />
                        <div className="dropdown-user-info">
                          <h4 className="user-name">{userAuth?.name || 'Người dùng'}</h4>
                          <p className="user-email">{userAuth?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                      <div className="dropdown-actions" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        <div>
                          <Link to="/profile/info-customer" className="dropdown-link" style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="dropdown-icon">📦</span>
                            Tài khoản
                          </Link>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div>
                          <button onClick={handleLogout} className="dropdown-link logout-btn" style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="dropdown-icon">🚪</span>
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-header">
                        <div className="avatar-placeholder">
                          <span className="avatar-icon">👤</span>
                        </div>
                        <div className="dropdown-user-info">
                          <h4 className="user-name">Khách</h4>
                          <p className="user-email">Vui lòng đăng nhập</p>
                        </div>
                      </div>
                      <div className="dropdown-actions" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        <div>
                          <Link to="/auth/login" className="dropdown-link" style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="dropdown-icon">🔑</span>
                            Đăng nhập
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button className="mobile-menu-btn">
                <span className="menu-line"></span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <div className="mobile-nav-container">
          <div className="mobile-nav-header">
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="mobile-search-input"
              />
              <button className="mobile-search-btn">
                <span>🔍</span>
              </button>
            </div>
          </div>

          <div className="mobile-nav-menu">
            <div className="mobile-user-section">
              {Object.keys(userAuth).length !== 0 ? (
                <div className="mobile-user-info">
                  <img
                    src={userAuth?.avatar ? userAuth?.avatar : '/user.png'}
                    alt="User"
                    className="mobile-user-avatar"
                  />
                  <div className="mobile-user-details">
                    <h4>{userAuth?.name || 'Người dùng'}</h4>
                    <p>{userAuth?.email || 'user@example.com'}</p>
                  </div>
                </div>
              ) : (
                <Link to="/auth/login" className="mobile-login-btn">
                  <span className="login-icon">👤</span>
                  Đăng nhập / Đăng ký
                </Link>
              )}
            </div>

            <ul className="mobile-menu-list">
              {categories && categories.map((category, index) => (
                <li key={index} className="mobile-menu-item">
                  <div className="mobile-menu-header">
                    <span className="mobile-menu-title">{category.name}</span>
                    <span className="mobile-menu-arrow">▼</span>
                  </div>
                  <ul className="mobile-submenu">
                    {category.children && category.children.map((child, childIndex) => (
                      <li key={childIndex} className="mobile-submenu-item">
                        <Link
                          to="/products"
                          onClick={() => navigate('/products', { state: { categoryId: child.id } })}
                          className="mobile-submenu-link"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="mobile-actions">
              <button className="mobile-action-btn" onClick={handleNavigate}>
                <span className="mobile-action-icon">🛒</span>
                <span>Giỏ hàng ({countCart})</span>
              </button>
              <button className="mobile-action-btn">
                <span className="mobile-action-icon">💬</span>
                <span>Hỗ trợ</span>
              </button>
              {Object.keys(userAuth).length !== 0 && (
                <>
                  <Link to="/profile/info-customer" className="mobile-action-btn">
                    <span className="mobile-action-icon">👤</span>
                    <span>Tài khoản</span>
                  </Link>
                  <Link to="/u/order" className="mobile-action-btn">
                    <span className="mobile-action-icon">📦</span>
                    <span>Đơn hàng</span>
                  </Link>
                  <Link to="/profile/change-password" className="mobile-action-btn">
                    <span className="mobile-action-icon">🔒</span>
                    <span>Đổi mật khẩu</span>
                  </Link>
                  <button onClick={handleLogout} className="mobile-action-btn logout">
                    <span className="mobile-action-icon">🚪</span>
                    <span>Đăng xuất</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
