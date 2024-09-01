import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Form } from 'antd';
import './purchaseorder.css';
import { getAllOrder } from '~/services/user/order-service';
import { formatNumber } from '~/components/common/ultils';
import { OrderType } from './order-type';

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
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const res = await getAllOrder();
            console.log(res);
            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
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
                        <RangePicker style={{ marginRight: '40px' }} />
                        <Select placeholder="Chọn trạng thái" style={{ width: 200 }} allowClear>
                            <Option value={OrderType.PENDING}>Đang chuẩn bị hàng</Option>
                            <Option value={OrderType.PROCESSING}>Đang xử lý</Option>
                            <Option value={OrderType.SHIPED}>Đang giao hàng</Option>
                            <Option value={OrderType.COMPLETED}>Hoàn thành</Option>
                            <Option value={OrderType.CANCELLED}>Đã hủy</Option>
                        </Select>
                    </div>
                    <div className="content-customer-order-list">
                        {orders &&
                            orders.length > 0 &&
                            orders.map((item, index) => (
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
                                        <p style={{ color: '#ee4d2d' }} className="order-list-item-total-price">
                                            {formatNumber(Number(item?.total_price))} đ
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseOrder;
