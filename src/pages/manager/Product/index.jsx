import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Input, Select, Row, Col, Tag, Modal } from 'antd';
import '../Admin/admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled, ImportOutlined } from '@ant-design/icons';
import { deleteCustomer, fetchAllCustomer, getDetailCustomer } from '~/services/admin/admin-customer-service';
import moment from 'moment';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteVoucher, fetchAllVoucher, getDetailVoucher } from '~/services/admin/admin-voucher-service';
import {
    deleteProduct,
    fetchAllProduct,
    getDetailProduct,
    importProduct,
} from '~/services/admin/admin-product-service';
import FormCreateProduct from './components/FormCreateProduct';
import { fetchAllChildCategory } from '~/services/admin/admin-category-service';
import FormUpdateProduct from './components/FormUpdateProduct';
import { useLocation } from 'react-router-dom';
const { RangePicker } = DatePicker;

function Product() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(12);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(null);
    const [q, setQ] = useState('');
    const [isModalCreateProductVisible, setIsModalCreateProductVisible] = useState(false);
    const [isModalUpdateProductVisible, setIsModalUpdateProductVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [productId, setProductId] = useState(null);
    const [productType, setProductType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [cateName, setcateName] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [productDetail, setProductDetail] = useState({});
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(null);
    const [note, setNote] = useState('');

    console.log(dateRange);

    useEffect(() => {
        getAllProduct();
        getAllCategory();
    }, [q, status, page, take, productType, categoryId, fromDate, toDate]);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct({ q, status, page, take, productType, categoryId, fromDate, toDate });
            setProducts(res.data);
            setTotal(res.meta.item_count);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllCategory = async () => {
        try {
            const res = await fetchAllChildCategory(cateName, 1, 1000);
            console.log('---- RES -----',res);
            
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(fromDate);
    console.log(toDate);

    // Xử lý date
    const handleDateChange = (dates) => {
        setDateRange(dates);
        if (dates) {
            const formattedDates = dates.map((date) => (date ? date.format('DD-MM-YYYY') : null));
            setFromDate(formattedDates[0]);
            setToDate(formattedDates[1]);
        } else {
            setFromDate(null);
            setToDate(null);
        }
    };

    const handleModalClose = () => {
        setIsModalCreateProductVisible(false);
        setIsModalUpdateProductVisible(false);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(productId);
            openNotificationSuccess('Thành công', 'Xóa sản phẩm thành công!');
            setDeleteModalVisible(false);
            await getAllProduct();
        } catch (error) {
            openNotificationError('Thất bại', 'Xóa sản phẩm thất bại!');
        }
    };

    const handleOpenFormUpdateProduct = async (productId) => {
        try {
            setIsModalUpdateProductVisible(!isModalUpdateProductVisible);
            const res = await getDetailProduct(productId);
            setProductDetail(res?.data);
            // setSelectedUser(customerId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setTake(pagination.pageSize);
    };

    const handleImportProduct = async () => {
        try {
            await importProduct({ productId, quantity, note });
            getAllProduct();
            openNotificationSuccess('Thành công!', 'Nhập thêm sản phẩm thành công!');
            setQuantity(null);
            setNote('');
            setOpen(false);
        } catch (error) {
            openNotificationError('Thất bại!', error.response.data.message);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: 'STT',
            width: 80,
            dataIndex: 'key',
            key: '0',
            fixed: 'left',
        },
        { title: 'Tên sản phẩm', dataIndex: 'name', key: '1', width: 200 },
        { title: 'Danh mục sản phẩm', dataIndex: 'category', key: '2', width: 200 },
        { title: 'Giá tiền', dataIndex: 'price', key: '3', width: 200 },
        { title: 'Bảo hành', dataIndex: 'warranty_period', key: '4', width: 200 },
        { title: 'Cân nặng', dataIndex: 'weight', key: '5', width: 200 },
        { title: 'Loại hàng', dataIndex: 'product_type', key: '6', width: 200 },
        { title: 'Tình trạng hàng', dataIndex: 'availability', key: '7', width: 150 },
        { title: 'Số lượng còn', dataIndex: 'quantity', key: '8', width: 200 },
        { title: 'Số lượng đã bán ', dataIndex: 'sold', key: '9', width: 200 },
        { title: 'Số lượt đánh giá', dataIndex: 'number_of_review', key: '10', width: 150 },
        { title: 'Số sao trung bình', dataIndex: 'rating_rate', key: '11', width: 200 },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '12',
            width: 150,
            render: (text) => <Tag color={text === 'Đang hoạt động' ? 'blue' : 'red'}>{text}</Tag>,
        },
        { title: 'ID', dataIndex: 'id', key: '13', width: 0 },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type="button"
                        icon={<EditOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            marginRight: 20,
                            backgroundColor: '#FFCC33',
                        }}
                        size="large"
                        onClick={() => handleOpenFormUpdateProduct(record?.id)}
                    ></Button>
                    <Button
                        type="button"
                        icon={<DeleteOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            backgroundColor: '#FF3333',
                        }}
                        size="large"
                        onClick={() => {
                            setDeleteModalVisible(true);
                            setProductId(record?.id);
                        }}
                    ></Button>
                    <Button
                        type="button"
                        icon={<ImportOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            backgroundColor: '#3399FF',
                            marginLeft: '20px',
                        }}
                        size="large"
                        onClick={() => {
                            setOpen(true);
                            setProductId(record?.id);
                        }}
                    ></Button>
                </span>
            ),
        },
    ];

    return (
        <>
            <Row gutter={16} align="middle" justify="space-between">
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Input
                                placeholder="Nội dung tìn kiếm"
                                style={{ width: '200px' }}
                                onChange={(e) => setQ(e.target.value)}
                                allowClear
                            />
                        </Col>
                        <Col>
                            <Select
                                value={status}
                                onChange={(value) => setStatus(value)}
                                placeholder="Trạng thái"
                                style={{ width: '200px' }}
                                allowClear
                            >
                                <Select.Option value="true">Đang hoạt động</Select.Option>
                                <Select.Option value="false">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                onChange={handleDateChange}
                                value={dateRange}
                                format="DD-MM-YYYY"
                                allowClear
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col>
                            <Select
                                placeholder="Chọn loại sản phẩm"
                                style={{ width: '200px' }}
                                allowClear
                                onChange={(value) => setProductType(value)}
                                value={productType} // Đảm bảo giá trị đã chọn được hiển thị
                            >
                                <Select.Option value="new_product">Hàng mới về</Select.Option>
                                <Select.Option value="best_selling">Hàng bán chạy</Select.Option>
                                <Select.Option value="inventory">Hàng tồn kho</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                placeholder="Chọn danh mục sản phẩm"
                                style={{ width: '200px' }}
                                showSearch
                                allowClear
                                onChange={(value) => setCategoryId(value)}
                                value={categoryId}
                                filterOption={(input, option) => {
                                    const children = String(option.children).toLowerCase();
                                    return children.includes(input.toLowerCase());
                                }}
                            >
                                {categories.map((category) => (
                                    <Select.Option key={category?.id} value={category?.id}>
                                        {category?.name} - {category?.parent?.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        {/* <Col>
                            <Select placeholder="Loại hàng" style={{ width: '300px' }} allowClear>
                                <Select.Option value="samsung">Sản phẩm mới</Select.Option>
                                <Select.Option value="tosiba">Sản phẩm bán chạy</Select.Option>
                            </Select>
                        </Col> */}
                    </Row>
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalCreateProductVisible(true)}
                            >
                                Thêm mới
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="button"
                                style={{ backgroundColor: '#009900', color: '#fff' }}
                                icon={<FileExcelFilled style={{ color: '#fff' }} />}
                            >
                                Xuất Excel
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div style={{ height: '53px' }}></div>
                    </Row>
                </Col>
            </Row>
            <Table
                style={{ marginTop: 40 }}
                columns={columns}
                dataSource={products?.map((data, index) => {
                    const realIndex = (page - 1) * take + index + 1;
                    return {
                        key: realIndex,
                        name: data?.name,
                        category: data?.category?.name,
                        price: formatNumber(data?.price),
                        warranty_period: `${data?.warranty_period} tháng`,
                        weight: data?.weight,
                        product_type: (() => {
                            switch (data?.product_type) {
                                case 'new_product':
                                    return 'Sản phẩm mới';
                                case 'best_selling':
                                    return 'Hàng bán chạy';
                                case 'inventory':
                                    return 'Tồn kho';
                                default:
                                    return 'Chưa xác định'; // Nếu có loại nào không được xác định
                            }
                        })(),
                        availability: data.availability === true ? 'Còn hàng' : 'Hết hàng',
                        quantity: data.quantity,
                        sold: data.sold,
                        number_of_review: data.number_of_review,
                        rating_rate: data.rating_rate,
                        status: data.status === true ? 'Đang hoạt động' : 'Ngừng hoạt động',
                        id: data.id,
                    };
                })}
                scroll={{ x: 1300 }}
                onChange={handleTableChange}
                pagination={{
                    current: page,
                    pageSize: take,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['12', '20', '50', '100'],
                }}
            />
            <FormCreateProduct
                isModalCreateProductVisible={isModalCreateProductVisible}
                handleModalClose={handleModalClose}
                getDataProduct={getAllProduct}
            />
            <FormUpdateProduct
                isModalUpdateProductVisible={isModalUpdateProductVisible}
                handleModalClose={handleModalClose}
                data={productDetail}
                getDataProduct={getAllProduct}
            />
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FF3333', fontSize: '24px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '20px' }}>Xác nhận xóa</span>
                    </div>
                }
                visible={deleteModalVisible}
                onOk={handleDeleteProduct} // Define this function to handle delete action
                onCancel={() => setDeleteModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                centered // Center the modal vertically
            >
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn xóa?</p>
            </Modal>
            <Modal
                open={open}
                title="Nhập hàng"
                onOk={handleImportProduct}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <Input
                    placeholder="Số lượng sản phẩm cần nhập"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ marginBottom: '16px' }}
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                />
                <Input.TextArea placeholder="Ghi chú" rows={5} value={note} onChange={(e) => setNote(e.target.value)} />
            </Modal>
        </>
    );
}

export default Product;
