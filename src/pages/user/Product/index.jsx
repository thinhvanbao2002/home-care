import { Select, Input, Slider, Button, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import './styles/style.css';
import './styles/grid.css';
import './styles/responsive.css';
import { fetchAllProduct } from '~/services/user/product-service';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { fetchAllChildCategory } from '~/services/user/category-service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart } from '~/services/user/cart-service';

const { Option } = Select;

function UserProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [take, setTake] = useState(40); // Number of products per page
    const [categoryId, setCategoryId] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [sortOrder, setSortOrder] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 20000000]); // Default price range
    const [statusFilter, setStatusFilter] = useState(null);

    const auth = useSelector((state) => state?.auth?.user);
    const location = useLocation();

    const categoryFilterId = location?.state?.categoryId;

    console.log('categoryFilterId', categoryFilterId);

    const handleNavigate = (id) => {
        navigate('/product-detail', { state: { id } });
    };

    useEffect(() => {
        setCategoryId(categoryFilterId);
    }, [categoryFilterId]);

    useEffect(() => {
        getAllProduct();
        getAllCategory();
    }, [currentPage, categoryId, searchName, sortOrder, priceRange, statusFilter, categoryFilterId]);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct({
                page: currentPage, // Use currentPage state for pagination
                take,
                categoryId,
                q: searchName,
                sortOrder,
            });
            console.log(res);

            setProducts(res.data); // Assuming the API returns a list of items
            setTotalPages(res.meta.page_count); // Assuming total pages are returned from the API
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

    const handleSearch = (value) => {
        setSearchName(value);
    };

    const handleSortOrderChange = (value) => {
        setSortOrder(value);
    };

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    const handleStatusChange = (value) => {
        setStatusFilter(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page on page change
    };

    return (
        <>
            <header style={{ marginTop: '40px' }} className="home-header">
                <nav className="home-nav">
                    <Input.Search
                        value={searchName}
                        placeholder="Tìm theo tên sản phẩm"
                        allowClear
                        onChange={(e) => {
                            setSearchName(e.target.value);
                            setCategoryId(null);
                        }}
                        style={{ width: 500, marginRight: '1rem' }}
                    />
                    <Select
                        allowClear
                        placeholder="Sắp xếp giá"
                        onChange={handleSortOrderChange}
                        style={{ width: 150, marginRight: '1rem' }}
                    >
                        <Option value="ASC">Giá tăng dần</Option>
                        <Option value="DESC">Giá giảm dần</Option>
                    </Select>
                    {/* <Select placeholder="Khoảng giá" onChange={handleStatusChange} style={{ width: 200 }}>
                        <Option value="in_stock"> Đến 200.000</Option>
                        <Option value="new_arrival">Đến 500.000</Option>
                        <Option value="pre_order">Đến 1.000.000</Option>
                        <Option value="in_stock"> Đến 2.000.000</Option>
                        <Option value="new_arrival">Đến 500.000</Option>
                        <Option value="pre_order">Đến 1.000.000</Option>
                    </Select>
                    <Select placeholder="Tình trạng hàng" onChange={handleStatusChange} style={{ width: 200 }}>
                        <Option value="in_stock">Hàng tồn kho</Option>
                        <Option value="new_arrival">Hàng mới về</Option>
                        <Option value="pre_order">Đặt trước</Option>
                    </Select> */}
                </nav>
            </header>

            <section style={{ background: '#fff' }} className="home-featured-products">
                {products &&
                    products.length > 0 &&
                    products.map((product, index) => (
                        <div onClick={() => handleNavigate(product.id)} key={index} className="home-product">
                            <img src={product?.image} alt={product?.name} />
                            <h3
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '200px',
                                }}
                            >
                                {product?.name}
                            </h3>
                            <p>Giá: {formatNumber(Number(product?.price))} VND</p>
                        </div>
                    ))}
            </section>

            {/* Pagination Component */}
            <Pagination
                current={currentPage}
                pageSize={take}
                total={totalPages * take} // Total number of products (pages * products per page)
                onChange={handlePageChange}
                style={{ textAlign: 'center', margin: '20px 0' }}
            />

            <section className="home-shop-intro">
                <h2>Giới thiệu về chúng tôi</h2>
                <p>
                    Chúng tôi cung cấp những sản phẩm máy lọc không khí tốt nhất để bảo vệ sức khỏe gia đình bạn. Hãy
                    khám phá các sản phẩm của chúng tôi để tận hưởng không khí trong lành mỗi ngày.
                </p>
            </section>
        </>
    );
}

export default UserProduct;
