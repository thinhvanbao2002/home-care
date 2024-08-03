import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Input, Select, Row, Col, Tag, Modal } from 'antd';
import '../Admin/admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled } from '@ant-design/icons';
import { deleteCustomer, fetchAllCustomer, getDetailCustomer } from '~/services/admin/admin-customer-service';
import moment from 'moment';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteVoucher, fetchAllVoucher, getDetailVoucher } from '~/services/admin/admin-voucher-service';
import { fetchAllProduct } from '~/services/admin/admin-product-service';
import FormCreateProduct from './components/FormCreateProduct';
const { RangePicker } = DatePicker;

function Product() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [q, setQ] = useState('');
    const [isModalCreateProductVisible, setIsModalCreateProductVisible] = useState(false);

    useEffect(() => {
        getAllProduct();
    }, [q]);

    const getAllProduct = async () => {
        try {
            const res = await fetchAllProduct(q);
            setProducts(res.data);
        } catch (error) {}
    };

    // Xử lý date
    const handleDateChange = (dates) => {
        // setDateRange(dates);
        // if (dates) {
        //     const formattedDates = dates.map((date) => (date ? date.format('DD-MM-YYYY') : null));
        //     setFromDate(formattedDates[0]);
        //     setToDate(formattedDates[1]);
        // }
    };

    const handleModalClose = () => {
        // setIsModalVisible(false);
        setIsModalCreateProductVisible(false);
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
            width: 150,
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
                        //  onClick={() => handleOpenDetailCustomer(record?.id)}
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
                        //  onClick={() => {
                        //      setDeleteModalVisible(true);
                        //      setCustomerId(record?.id);
                        //  }}
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
                            <Select placeholder="Trạng thái" style={{ width: '200px' }} allowClear>
                                <Select.Option value="Đang hạt động">Đang hạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                onChange={handleDateChange}
                                // value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col>
                            <Select placeholder="Loại sản phẩm" style={{ width: '200px' }} allowClear>
                                <Select.Option value="Đang hạt động">Đang hạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Thương hiệu" style={{ width: '200px' }} allowClear>
                                <Select.Option value="samsung">Samsung</Select.Option>
                                <Select.Option value="tosiba">Tosiba</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Loại hàng" style={{ width: '300px' }} allowClear>
                                <Select.Option value="samsung">Sản phẩm mới</Select.Option>
                                <Select.Option value="tosiba">Sản phẩm bán chạy</Select.Option>
                            </Select>
                        </Col>
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
                        name: data.name,
                        category: data.category.name,
                        price: formatNumber(data.price),
                        warranty_period: `${data.warranty_period} tháng`,
                        weight: data.weight,
                        product_type: (() => {
                            switch (data.product_type) {
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
                pagination={{
                    // current: page,
                    // pageSize: take,
                    // total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            <FormCreateProduct
                isModalCreateProductVisible={isModalCreateProductVisible}
                handleModalClose={handleModalClose}
                getDataProduct={getAllProduct}
            />
        </>
    );
}

export default Product;
