import { Button, Col, DatePicker, Input, Modal, Row, Select, Table } from 'antd';
import {
    ExclamationCircleOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelFilled,
} from '@ant-design/icons';
import { fetchAllOrder, getDetailOrder } from '~/services/admin/admin-order-service';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { formatNumber } from '~/components/common/ultils';
import FormDetailOrder from './components/FormDetailOrder';
const { RangePicker } = DatePicker;

function AdminOrder() {
    const [q, setQ] = useState(null);
    const [status, setStatus] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(12);
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [order, setOrder] = useState({});

    useEffect(() => {
        getAllOrder();
    }, [status]);

    console.log(orders);

    const handleOpenFormDetailOrder = async (orderId) => {
        try {
            console.log(orderId);
            const res = await getDetailOrder(orderId);
            setOrder(res.data);
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.log(error);
        }
        // setDeleteModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        // setSelectedUser(null);
    };

    const getAllOrder = async () => {
        try {
            const res = await fetchAllOrder({ status, fromDate, toDate, page, take });
            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: 'STT',
            width: 80,
            dataIndex: 'key',
            key: '0',
            fixed: 'left',
        },

        { title: 'Mã đơn hàng', dataIndex: 'order_id', key: '1', width: 200 },
        { title: 'Ngày đặt', dataIndex: 'created_at', key: '2', width: 200 },
        { title: 'Tên khách hàng', dataIndex: 'customer_name', key: '3', width: 200 },
        { title: 'Số lượng sản phẩm', dataIndex: 'product_number', key: '4', width: 200 },
        { title: 'Tổng tiền', dataIndex: 'total_price', key: '5', width: 200 },
        { title: 'Trạng thái đơn hàng', dataIndex: 'order_status', key: '6', width: 200 },
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
                        onClick={() => handleOpenFormDetailOrder(record?.order_id)}
                    ></Button>
                    {/* <Button
                        type="button"
                        icon={<DeleteOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            backgroundColor: '#FF3333',
                        }}
                        size="large"
                        // onClick={() => {
                        //     setDeleteModalVisible(true);
                        //     setProductId(record?.id);
                        // }}
                    ></Button> */}
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
                                // onChange={(e) => setQ(e.target.value)}
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
                                <Select.Option value="pending">Đang chờ xử lý</Select.Option>
                                <Select.Option value="progress">Đang chuẩn bị hàng</Select.Option>
                                <Select.Option value="confirmed">Đã chuẩn bị hàng</Select.Option>
                                <Select.Option value="shiped">Đang giao hàng</Select.Option>
                                <Select.Option value="completed">Đã hoàn thành</Select.Option>
                                <Select.Option value="cancelled">Đã hủy</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                // onChange={handleDateChange}
                                // value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        {/* <Col>
                            <Select
                                placeholder="Chọn loại sản phẩm"
                                style={{ width: '200px' }}
                                allowClear
                                // onChange={(value) => setProductType(value)}
                                // value={productType} // Đảm bảo giá trị đã chọn được hiển thị
                            >
                                <Select.Option value="new_product">Hàng mới về</Select.Option>
                                <Select.Option value="best_selling">Hàng bán chạy</Select.Option>
                                <Select.Option value="inventory">Hàng tồn kho</Select.Option>
                            </Select>
                        </Col> */}

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
                        {/* <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                // onClick={() => setIsModalCreateProductVisible(true)}
                            >
                                Thêm mới
                            </Button>
                        </Col> */}
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
                dataSource={orders?.map((data, index) => {
                    const realIndex = (page - 1) * take + index + 1;
                    return {
                        key: realIndex,
                        order_id: data?.id,
                        created_at: moment(data?.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        customer_name: data?.name,
                        product_number: data?.order_details.length,
                        total_price: formatNumber(Number(data?.total_price)),
                        order_status: (() => {
                            switch (data?.order_status) {
                                case 'pending':
                                    return 'Đang xử lý đơn hàng';
                                case 'confirmed':
                                    return 'Đã chuẩn bị hàng';
                                case 'progress':
                                    return 'Đang chuẩn bị hàng';
                                case 'shiped':
                                    return 'Đang giao hàng';
                                case 'completed':
                                    return 'Đã hoàn thành';
                                case 'cancelled':
                                    return 'Đã hủy';
                                default:
                                    return 'Chưa xác định'; // Nếu có loại nào không được xác định
                            }
                        })(),
                    };
                })}
                scroll={{ x: 1300 }}
                // onChange={handleTableChange}
                // pagination={{
                //     current: page,
                //     pageSize: take,
                //     total: total,
                //     showSizeChanger: true,
                //     pageSizeOptions: ['12', '20', '50', '100'],
                // }}
            />
            <FormDetailOrder
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                data={order}
                getDataOrder={getAllOrder}
            />
            {/* <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FF3333', fontSize: '24px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '20px' }}>Xác nhận xóa</span>
                    </div>
                }
                visible={deleteModalVisible}
                onOk={handleDeleteOrder} // Define this function to handle delete action
                onCancel={() => setDeleteModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                centered // Center the modal vertically
            >
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn xóa?</p>
            </Modal> */}
        </>
    );
}

export default AdminOrder;
