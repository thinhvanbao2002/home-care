import './styles/style.css';
import './styles/grid.css';
import './styles/responsive.css';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '~/services/user/product-service';
import { formatNumber } from '~/components/common/ultils';
import { fetchAllChildCategory } from '~/services/user/category-service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [take, setTake] = useState(20);
    const [categoryId, setcategoryId] = useState(null);

    const auth = useSelector((state) => state.auth);

    const handleNavigate = (id) => {
        navigate('/product-detail', { state: { id } });
    };

    useEffect(() => {
        console.log('render');

        getAllProduct();
        getAllCategory();
    }, [currentPage, categoryId]);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct({ page: currentPage, take, categoryId });
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

    const handleOrder = (productId) => {
        alert(productId);
    };

    const handleAddCart = (productId) => {
        alert(productId);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return; // Đảm bảo trang hợp lệ
        setCurrentPage(page);
    };

    return (
        <>
            <div className="grid wide">
                <div className="row sm-gutter app__content">
                    {/* <div className="col l-2 m-0 c-0"> */}
                    {/* <nav className="category">
                            <h3 className="category__heading">
                                <i className="category__heading-icon fa-solid fa-list"></i>Danh mục
                            </h3>
                            <ul className="category-list">
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((c) => (
                                        <li
                                            key={c.id}
                                            className="category-item category-item--active"
                                            onClick={() => setcategoryId(c.id)}
                                        >
                                            <a href="#" className="category-item-link">
                                                {c.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </nav> */}
                    {/* </div> */}

                    <div className="col l-12 m-12 c-12 ">
                        <div className="home-filter hide-on-mobile-tablet">
                            <span className="home-filter__label">Sắp xếp theo</span>
                            <button className="home-filter-btn btn">Phổ biến</button>
                            <button className="home-filter-btn btn btn--primary">Mới nhất</button>
                            <button className="home-filter-btn btn">Bán chạy</button>

                            <div className="select-input">
                                <span className="select-input__label">Giá</span>
                                <i className="select-input__icon fa-solid fa-angle-down"></i>
                                <ul className="select-input__list">
                                    <li className="select-input__item">
                                        <a href="#" className="select-input__link">
                                            Giá: Thấp đến cao
                                        </a>
                                    </li>

                                    <li className="select-input__item">
                                        <a href="#" className="select-input__link">
                                            Giá: Cao đến thấp
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="home-filter__page">
                                <span className="home-filter__page-num">
                                    <span className="home-filter__page-current">{currentPage}</span>/{totalPages}
                                </span>

                                <div className="home-filter__page-control">
                                    <a
                                        href="#"
                                        className={`home-filter__page-btn ${
                                            currentPage === 1 ? 'home-filter__page-btn--disabled' : ''
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                    >
                                        <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                                    </a>

                                    <a
                                        href="#"
                                        className={`home-filter__page-btn ${
                                            currentPage === totalPages ? 'home-filter__page-btn--disabled' : ''
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                    >
                                        <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <nav className="mobile-category">
                            <ul className="mobile-category__list">
                                {categories &&
                                    categories.length > 0 &&
                                    categories.map((c) => (
                                        <li key={c.id} className="mobile-category__item">
                                            <a href="#" className="mobile-category__link">
                                                {c.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </nav>
                        {/* <!-- Home product --> */}
                        <div className="home-product">
                            <div className="row sm-gutter">
                                {/* <!-- product item --> */}
                                {products &&
                                    products.length > 0 &&
                                    products.map((item) => (
                                        <div key={item.id} className="col l-2-4 m-3 c-6">
                                            <div className="home-product-item">
                                                <div
                                                    className="home-product-item__img"
                                                    onClick={() => handleNavigate(item.id)}
                                                    style={{ backgroundImage: `url('${item.image}')` }}
                                                ></div>
                                                <h4 className="home-product-item__name">{item.name}</h4>
                                                <div className="home-product-item__price">
                                                    <span className="home-product-item__price-current">
                                                        {formatNumber(item.price)} VND
                                                    </span>
                                                </div>

                                                <div className="home-product-item__favourite">
                                                    <i className="fa-solid fa-check"></i>
                                                    <span>Yêu thích</span>
                                                </div>

                                                <div className="home-product-item__sale-off">
                                                    <span className="home-product-item__sale-off-percent">10%</span>
                                                    <span className="home-product-item__sale-off-label">GIẢM</span>
                                                </div>

                                                <div className="home-product-item__buy">
                                                    <button
                                                        onClick={() => handleOrder(item.id)}
                                                        className="btn btn--size-s"
                                                    >
                                                        Mua
                                                    </button>
                                                    <button
                                                        onClick={() => handleAddCart(item.id)}
                                                        className="btn btn--size-s"
                                                    >
                                                        Giỏ hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- Pagination : Phân trang --> */}
                        <ul className="pagination home-product__pagination">
                            <li className={`pagination-item ${currentPage === 1 ? 'pagination-item--disabled' : ''}`}>
                                <a
                                    href="#"
                                    className="pagination-item__link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                >
                                    <i className="pagination-item__icon fa-solid fa-chevron-left"></i>
                                </a>
                            </li>

                            {[...Array(totalPages).keys()].map((page) => (
                                <li
                                    key={page + 1}
                                    className={`pagination-item ${
                                        currentPage === page + 1 ? 'pagination-item--active' : ''
                                    }`}
                                >
                                    <a
                                        href="#"
                                        className="pagination-item__link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page + 1);
                                        }}
                                    >
                                        {currentPage}
                                    </a>
                                </li>
                            ))}

                            <li
                                className={`pagination-item ${
                                    currentPage === totalPages ? 'pagination-item--disabled' : ''
                                }`}
                            >
                                <a
                                    href="#"
                                    className="pagination-item__link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage + 1);
                                    }}
                                >
                                    <i className="pagination-item__icon fa-solid fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
