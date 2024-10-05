import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Form, Modal } from 'antd';
import './purchaseorder.css';
import { cancelOrder, getAllOrder } from '~/services/user/order-service';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { OrderType } from './order-type';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const getOrderStatusLabel = (status) => {
    switch (status) {
        case OrderType.PENDING:
            return 'Đang chuẩn bị hàng';
        case OrderType.CONFIRMED:
            return 'Đã xác nhận';
        case OrderType.PROCESSING:
            return 'Đang xử lý';
        case OrderType.SHIPED:
            return 'Đang giao hàng';
        case OrderType.COMPLETED:
            return 'Hoàn thành';
        case OrderType.CANCELLED:
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
};

const getOrderStatusColor = (status) => {
    switch (status) {
        case OrderType.PENDING:
            return '#ff9800'; // Orange for pending
        case OrderType.CONFIRMED:
            return '#3f51b5'; // Blue for confirmed
        case OrderType.PROCESSING:
            return '#00bcd4'; // Cyan for processing
        case OrderType.SHIPED:
            return '#4caf50'; // Green for shipped
        case OrderType.COMPLETED:
            return '#8bc34a'; // Light green for completed
        case OrderType.CANCELLED:
            return '#f44336'; // Red for cancelled
        default:
            return '#9e9e9e'; // Grey for undefined
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

function PurchaseOrder() {
    const [form] = Form.useForm();
    const [orderId, setOderId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const res = await getAllOrder();
            setOrders(res.data);
            setFilteredOrders(res.data); // Lưu bản sao của danh sách đơn hàng ban đầu
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelOrder = async () => {
        try {
            setDeleteModalVisible(false);
            await cancelOrder({ orderId });
            await getOrders();
            openNotificationSuccess('Thành công!', 'Hủy đơn hàng thành công!');
        } catch (error) {
            openNotificationError('Thất bại!', error.response.data.message);
        }
    };

    const handleDateChange = (dates, dateStrings) => {
        setSelectedDates(dateStrings);
        filterOrders(dateStrings, selectedStatus); // Gọi hàm lọc khi có sự thay đổi về ngày
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        filterOrders(selectedDates, status); // Gọi hàm lọc khi có sự thay đổi về trạng thái
    };

    const filterOrders = (dates, status) => {
        const [startDate, endDate] = dates;

        const filtered = orders.filter((order) => {
            const orderDate = new Date(order.created_at);

            const isWithinDateRange =
                (!startDate || new Date(startDate) <= orderDate) && (!endDate || orderDate <= new Date(endDate));

            const matchesStatus = !status || order.order_status === status;

            return isWithinDateRange && matchesStatus;
        });

        setFilteredOrders(filtered);
    };

    return (
        <>
            <div className="customer-order">
                <div className="header-customer-order">
                    <h2>Đơn hàng của bạn</h2>
                    <p>Quản lý thông tin đơn hàng</p>
                </div>
                <div className="content-customer-order">
                    <div
                        className="content-customer-order-filter"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginTop: '40px',
                            marginBottom: '40px',
                        }}
                    >
                        <RangePicker
                            style={{ marginRight: '40px' }}
                            placeholder={['Từ ngày', 'Đến ngày']}
                            onChange={handleDateChange}
                        />
                        <Select
                            placeholder="Chọn trạng thái"
                            style={{ width: 200 }}
                            allowClear
                            onChange={handleStatusChange}
                        >
                            <Option value={OrderType.PENDING}>Đang chuẩn bị hàng</Option>
                            <Option value={OrderType.PROCESSING}>Đang xử lý</Option>
                            <Option value={OrderType.SHIPED}>Đang giao hàng</Option>
                            <Option value={OrderType.COMPLETED}>Hoàn thành</Option>
                            <Option value={OrderType.CANCELLED}>Đã hủy</Option>
                        </Select>
                    </div>
                    <div className="content-customer-order-list">
                        {filteredOrders &&
                            filteredOrders.length > 0 &&
                            filteredOrders.map((item, index) => (
                                <div key={index} className="order-list-item">
                                    <div className="order-list-item-header">
                                        <h4 className="item-order-code">
                                            Mã đơn hàng: <span style={{ color: '#ee4d2d' }}>{item.id}</span>
                                        </h4>
                                        <h4 className="item-order-date">
                                            Ngày:{' '}
                                            <span style={{ color: '#ee4d2d' }}>{formatDate(item.created_at)}</span>
                                        </h4>
                                        <h4
                                            className="item-order-status"
                                            style={{ color: getOrderStatusColor(item.order_status) }}
                                        >
                                            {getOrderStatusLabel(item.order_status)}
                                        </h4>
                                    </div>
                                    <div className="order-list-item-products">
                                        {item.order_details &&
                                            item.order_details.length > 0 &&
                                            item.order_details.map((od, index) => (
                                                <div key={index} className="order-item-product">
                                                    <div className="order-item-product-info">
                                                        <img src={od?.product?.image} alt="" />
                                                        <p>{od?.product?.name} </p>
                                                    </div>
                                                    <p className="order-item-product-quantity">{od?.quantity}</p>
                                                    <span style={{ color: '#ee4d2d' }}>
                                                        {formatNumber(Number(od?.product?.price))} đ
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="order-list-item-footer">
                                        <h3>Tổng thanh toán:</h3>
                                        <p
                                            style={{ color: '#ee4d2d', marginTop: '0px' }}
                                            className="order-list-item-total-price"
                                        >
                                            {formatNumber(Number(item?.total_price))} đ
                                        </p>

                                        <h4
                                            className="item-order-status"
                                            onClick={() => {
                                                setDeleteModalVisible(true);
                                                setOderId(item?.id);
                                            }}
                                            style={{
                                                border: 'none',
                                                background:
                                                    item.order_status === 'completed' ||
                                                    item.order_status === 'cancelled'
                                                        ? '#ccc'
                                                        : 'red', // Nếu đơn hàng đã hoàn thành, đổi màu nền
                                                color: '#fff',
                                                cursor:
                                                    item.order_status === 'completed' ||
                                                    item.order_status === 'cancelled'
                                                        ? 'not-allowed'
                                                        : 'pointer', // Vô hiệu hóa con trỏ khi đã hoàn thành
                                                marginLeft: '20px',
                                            }}
                                        >
                                            Hủy đặt hàng
                                        </h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FF3333', fontSize: '24px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '20px' }}>Xác nhận hủy</span>
                    </div>
                }
                visible={deleteModalVisible}
                onOk={handleCancelOrder} // Define this function to handle delete action
                onCancel={() => setDeleteModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                centered // Center the modal vertically
            >
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn hủy đơn hàng!</p>
            </Modal>
        </>
    );
}

export default PurchaseOrder;
