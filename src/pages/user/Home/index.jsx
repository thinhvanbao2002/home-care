import './styles/style.css';
import './styles/grid.css';
import './styles/responsive.css';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '~/services/user/product-service';
import { formatNumber } from '~/components/common/ultils';
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div class="grid wide">
                <div class="row sm-gutter app__content">
                    <div class="col l-2 m-0 c-0">
                        <nav class="category">
                            <h3 class="category__heading">
                                <i class="category__heading-icon fa-solid fa-list"></i>Danh mục
                            </h3>
                            <ul class="category-list">
                                <li class="category-item category-item--active">
                                    <a href="" class="category-item-link">
                                        Sản phẩm
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Samsung
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        LG
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Panasonic
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Sanyo
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Sony
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Vìnash
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        audi
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        toyota
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        apple
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        xiaomi
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        oppo
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Huynhdai
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        Bao ngu
                                    </a>
                                </li>

                                <li class="category-item">
                                    <a href="" class="category-item-link">
                                        bao oc cho
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="col l-10 m-12 c-12 ">
                        <div class="home-filter hide-on-mobile-tablet">
                            <span class="home-filter__label">Săp xếp theo</span>
                            <button class="home-filter-btn btn">Phổ biến</button>
                            <button class="home-filter-btn btn btn--primary">Mới nhất</button>
                            <button class="home-filter-btn btn">Bán chạy</button>

                            <div class="select-input">
                                <span class="select-input__label">Giá</span>
                                <i class="select-input__icon fa-solid fa-angle-down"></i>
                                <ul class="select-input__list">
                                    <li class="select-input__item">
                                        <a href="" class="select-input__link">
                                            Giá: Thấp đến cao
                                        </a>
                                    </li>

                                    <li class="select-input__item">
                                        <a href="" class="select-input__link">
                                            Giá: Cao đến thấp
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div class="home-filter__page">
                                <span class="home-filter__page-num">
                                    <span class="home-filter__page-current">1</span>/14
                                </span>

                                <div class="home-filter__page-control">
                                    <a href="" class="home-filter__page-btn home-filter__page-btn--disabled">
                                        <i class="home-filter__page-icon fa-solid fa-angle-left"></i>
                                    </a>

                                    <a href="" class="home-filter__page-btn">
                                        <i class="home-filter__page-icon fa-solid fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <nav class="mobile-category">
                            <ul class="mobile-category__list">
                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>

                                <li class="mobile-category__item">
                                    <a href="" class="mobile-category__link">
                                        Dụng cụ & Thiết bị tiện ích
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- Home product --> */}
                        <div class="home-product">
                            <div class="row sm-gutter">
                                {/* <!-- product item --> */}
                                {products &&
                                    products.length > 0 &&
                                    products.map((item) => (
                                        <div class="col l-2-4 m-3 c-6">
                                            <div class="home-product-item">
                                                <div
                                                    class="home-product-item__img"
                                                    style={{ backgroundImage: `url('${item.image}')` }}
                                                ></div>
                                                <h4 class="home-product-item__name">{item.name}</h4>
                                                <div class="home-product-item__price">
                                                    {/* <span class="home-product-item__price-old">đ{item.price}</span> */}
                                                    <span class="home-product-item__price-current">
                                                        {formatNumber(item.price)} VND
                                                    </span>
                                                </div>

                                                <div class="home-product-item__favourite">
                                                    <i class="fa-solid fa-check"></i>
                                                    <span>Yêu thích</span>
                                                </div>

                                                <div class="home-product-item__sale-off">
                                                    <span class="home-product-item__sale-off-percent">10%</span>
                                                    <span class="home-product-item__sale-off-label">GIẢM</span>
                                                </div>

                                                <div class="home-product-item__buy">
                                                    <button class="btn btn--size-s">Mua</button>
                                                    <button class="btn btn--size-s">Chi tiết</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- Pagination : Phân trang --> */}
                        <ul class="pagination home-product__pagination">
                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    <i class="pagination-item__icon fa-solid fa-chevron-left"></i>
                                </a>
                            </li>

                            <li class="pagination-item pagination-item--active">
                                <a href="" class="pagination-item__link">
                                    1
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    2
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    3
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    4
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    5
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    ...
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    14
                                </a>
                            </li>

                            <li class="pagination-item">
                                <a href="" class="pagination-item__link">
                                    <i class="pagination-item__icon fa-solid fa-chevron-right"></i>
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
