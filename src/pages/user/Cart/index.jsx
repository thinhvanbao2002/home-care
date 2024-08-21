import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './cart.css';
import { useEffect, useState } from 'react';
import { deleteCart, getAllCart, updateCart } from '~/services/user/cart-service';
import { formatNumber, openNotificationSuccess } from '~/components/common/ultils';

function Cart() {
    const [carts, setCarts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]); // Trạng thái lưu trữ sản phẩm được chọn

    console.log(selectedProducts);

    useEffect(() => {
        findAllCart();
    }, []);

    const findAllCart = async () => {
        try {
            const res = await getAllCart();
            const updatedCarts = res.data.map((item) => ({ ...item, checked: false }));
            setCarts(updatedCarts);
            calculateTotalPrice(updatedCarts);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedCarts = carts.map((cart) => ({ ...cart, checked: newSelectAll }));
        setCarts(updatedCarts);
        calculateTotalPrice(updatedCarts);

        if (newSelectAll) {
            // Thêm tất cả sản phẩm vào mảng selectedProducts
            const selected = updatedCarts.map((item) => ({
                productId: item.id,
                quantity: item.product_number,
                totalPrice: item.product_number * item.product.price,
            }));
            setSelectedProducts(selected);
        } else {
            // Xóa tất cả sản phẩm khỏi mảng selectedProducts
            setSelectedProducts([]);
        }
    };

    const handleSelectItem = (index) => {
        const updatedCarts = [...carts];
        updatedCarts[index].checked = !updatedCarts[index].checked;
        setCarts(updatedCarts);

        const allSelected = updatedCarts.every((cart) => cart.checked);
        setSelectAll(allSelected);
        calculateTotalPrice(updatedCarts);

        if (updatedCarts[index].checked) {
            // Thêm sản phẩm vào mảng selectedProducts
            const selectedProduct = {
                productId: updatedCarts[index].id,
                quantity: updatedCarts[index].product_number,
                totalPrice: updatedCarts[index].product_number * updatedCarts[index].product.price,
            };
            setSelectedProducts((prevSelected) => [...prevSelected, selectedProduct]);
        } else {
            // Xóa sản phẩm khỏi mảng selectedProducts
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((item) => item.productId !== updatedCarts[index].id),
            );
        }
    };

    const handleQuantityChange = async (index, newQuantity, cartId) => {
        if (newQuantity >= 0) {
            const updatedCarts = [...carts];
            updatedCarts[index].product_number = newQuantity;
            setCarts(updatedCarts);

            try {
                await updateCart({ cartId, newQuantity });
                calculateTotalPrice(updatedCarts);
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        }
    };

    const handleDeleteCart = async (cartId) => {
        try {
            await deleteCart({ cartId });
            openNotificationSuccess('Thành công', 'Đã xóa sản phẩm trong giỏ hàng!');
            findAllCart();
        } catch (error) {}
    };

    const increaseQuantity = (index, cartId) => {
        handleQuantityChange(index, carts[index].product_number + 1, cartId);
    };

    const decreaseQuantity = (index, cartId) => {
        handleQuantityChange(index, carts[index].product_number > 0 ? carts[index].product_number - 1 : 0, cartId);
    };

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems
            .filter((item) => item.checked)
            .reduce((sum, item) => sum + item.product_number * item.product.price, 0);
        setTotalPrice(total);
    };

    const checkboxContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '20px', // Adjust font size for larger checkbox
    };

    const checkboxInputStyle = {
        width: '20px', // Adjust width for larger checkbox
        height: '20px', // Adjust height for larger checkbox
        marginRight: '8px',
        cursor: 'pointer',
        accentColor: '#007bff', // Optional: Change checkbox color
    };

    const checkboxLabelStyle = {
        cursor: 'pointer',
        fontSize: '20px', // Adjust label font size
    };

    return (
        <>
            <div className="app__container">
                <div className="grid wide">
                    <div className="cart">
                        <div className="cart__header">
                            <div className="cart__header-left">
                                <div style={checkboxContainerStyle}>
                                    <input
                                        type="checkbox"
                                        id="select-all"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        style={checkboxInputStyle}
                                    />
                                    <label htmlFor="select-all" style={checkboxLabelStyle}>
                                        Chọn tất cả
                                    </label>
                                </div>
                                <div className="header-title">Sản Phẩm</div>
                            </div>
                            <div className="cart__header-right">
                                <div className="header-title">Đơn Giá</div>
                                <div className="header-title">Số Lượng</div>
                                <div className="header-title">Số Tiền</div>
                                <div className="header-title">Thao Tác</div>
                            </div>
                        </div>
                        <div className="cart__items">
                            {carts &&
                                carts.length > 0 &&
                                carts.map((item, index) => (
                                    <div className="cart__item" key={item.id}>
                                        <div className="cart__item-left">
                                            <div style={checkboxContainerStyle}>
                                                <input
                                                    type="checkbox"
                                                    id={`item-${index}`}
                                                    checked={item.checked}
                                                    onChange={() => handleSelectItem(index)}
                                                    style={checkboxInputStyle}
                                                />
                                                <label htmlFor={`item-${index}`} style={checkboxLabelStyle}></label>
                                            </div>
                                            <div className="item-details">
                                                <img src={item.product.image} alt={item.product.name} />
                                                <p>{item?.product?.name}</p>
                                            </div>
                                        </div>
                                        <div className="cart__item-right">
                                            <div className="unit-price">
                                                <span className="unit-price-new">
                                                    {formatNumber(Number(item?.product?.price))} đ
                                                </span>
                                            </div>
                                            <div className="quantity">
                                                <button
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    className="quantity-btn"
                                                    onClick={() => decreaseQuantity(index, item?.id)}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-minus" />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item?.product_number}
                                                    onChange={(e) =>
                                                        handleQuantityChange(index, parseInt(e.target.value), item.id)
                                                    }
                                                />
                                                <button
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    className="quantity-btn"
                                                    onClick={() => increaseQuantity(index, item?.id)}
                                                >
                                                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                                                </button>
                                            </div>
                                            <div className="total-price">
                                                {formatNumber(Number(item?.product_number * item?.product?.price))} đ
                                            </div>
                                            <button onClick={() => handleDeleteCart(item?.id)} className="delete-btn">
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="card__buy">
                    <div className="card__buy-left">
                        {/* <div className="checkbox">
                            <input
                                type="checkbox"
                                id="select-all-bottom"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <label htmlFor="select-all-bottom">Chọn Tất Cả</label>
                        </div>
                        <div className="actions">
                            <button className="delete-all">Xóa</button>
                            <button className="save-all">Lưu vào mục Đã th...</button>
                        </div> */}
                    </div>

                    <div className="card__buy-right">
                        <div className="total-summary">
                            <div className="total-amount">
                                Tổng thanh toán: <span>{formatNumber(totalPrice)} đ</span>
                            </div>
                            <button
                                className="voucher-button"
                                onClick={() => (document.getElementById('voucher-modal').style.display = 'block')}
                            >
                                Nhập Voucher
                            </button>
                            <button className="buy-button">Mua Hàng</button>
                        </div>
                    </div>
                </div>

                {/* <!-- Modal nhập voucher --> */}
                <div id="voucher-modal" className="voucher-modal">
                    <div className="voucher-modal-content">
                        <div
                            className="close"
                            onClick={() => (document.getElementById('voucher-modal').style.display = 'none')}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <h3>Nhập mã voucher</h3>
                        <div className="voucher-input">
                            <input type="text" id="voucher-code" placeholder="Nhập mã voucher" />
                            <button onClick={() => console.log('Apply voucher')}>Áp dụng</button>
                        </div>
                        <h3>Tìm kiếm voucher</h3>
                        <div className="voucher-search">
                            <input type="text" id="search-voucher" placeholder="Tìm kiếm voucher" />
                            <button onClick={() => console.log('Search voucher')}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
