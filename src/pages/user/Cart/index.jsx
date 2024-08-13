import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './cart.css';

function Cart() {
    return (
        <>
            <div class="app">
                {/* <!-- Header --> */}
                <header class="header">
                    <div class="grid wide">
                        <div class="logo-cart">
                            <img src="/logo-homecare.jpg" alt="" />
                            <h1>Giỏ hàng</h1>
                        </div>
                    </div>
                </header>

                <div class="app__container">
                    <div class="grid wide">
                        <div class="cart">
                            <div class="cart__header">
                                <div class="cart__header-left">
                                    <div class="checkbox">
                                        <input type="checkbox" id="select-all" />
                                        <label for="select-all">Chọn tất cả</label>
                                    </div>
                                    <div class="header-title">Sản Phẩm</div>
                                </div>
                                <div class="cart__header-right">
                                    <div class="header-title">Đơn Giá</div>
                                    <div class="header-title">Số Lượng</div>
                                    <div class="header-title">Số Tiền</div>
                                    <div class="header-title">Thao Tác</div>
                                </div>
                            </div>
                            <div class="cart__items">
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                                <div class="cart__item">
                                    <div class="cart__item-left">
                                        <div class="checkbox">
                                            <input type="checkbox" id="item1" />
                                            <label for="item1"></label>
                                        </div>
                                        <div class="item-details">
                                            <img
                                                src="https://cdn.tuoitre.vn/thumb_w/640/2018/photo-2-1515036885124.jpg"
                                                alt="Máy lọc không khí cao cấp"
                                            />
                                            <p>Máy lọc không khí cao cấp</p>

                                            <div class="classified" onclick="toggleDropdown()">
                                                <div id="dropdown" class="dropdown-menu">
                                                    <div class="dropdown-item">
                                                        <p>Màu sắc:</p>
                                                        <select>
                                                            <option value="black">Đen</option>
                                                            <option value="white">Trắng</option>
                                                            <option value="grey">Xám</option>
                                                        </select>
                                                    </div>
                                                    <div class="dropdown-item">
                                                        <p>Kích cỡ:</p>
                                                        <select>
                                                            <option value="s">S</option>
                                                            <option value="m">M</option>
                                                            <option value="l">L</option>
                                                            <option value="xl">XL</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cart__item-right">
                                        <div class="unit-price">
                                            <span class="unit-price-new">đ299.000</span>
                                        </div>
                                        <div class="quantity">
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-minus" />
                                            </button>
                                            <input type="text" value="1123" />
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                class="quantity-btn"
                                            >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </button>
                                        </div>
                                        <div class="total-price">đ299.000</div>
                                        <button class="delete-btn">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card__buy">
                        <div class="card__buy-left">
                            <div class="checkbox">
                                <input type="checkbox" id="select-all" />
                                <label for="select-all">Chọn Tất Cả</label>
                            </div>
                            <div class="actions">
                                <button class="delete-all">Xóa</button>
                                <button class="save-all">Lưu vào mục Đã th...</button>
                            </div>
                        </div>

                        <div class="card__buy-right">
                            <div class="total-summary">
                                <div class="total-amount">
                                    Tổng thanh toán (1 Sản phẩm): <span>đ209.000</span>
                                </div>
                                <div class="savings">
                                    Tiết kiệm: <span>đ241k</span>
                                </div>
                                <button class="voucher-button" onclick="openVoucherModal()">
                                    Nhập Voucher
                                </button>
                                <button class="buy-button">Mua Hàng</button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modal nhập voucher --> */}
                    <div id="voucher-modal" class="voucher-modal">
                        <div class="voucher-modal-content">
                            <div class="close" onclick="closeVoucherModal()">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <h3>Nhập mã voucher</h3>
                            <div class="voucher-input">
                                <input type="text" id="voucher-code" placeholder="Nhập mã voucher" />
                                <button onclick="applyVoucher()">Áp dụng</button>
                            </div>
                            <h3>Tìm kiếm voucher</h3>
                            <div class="voucher-search">
                                <input type="text" id="search-voucher" placeholder="Tìm kiếm voucher" />
                                <button onclick="searchVoucher()">Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
