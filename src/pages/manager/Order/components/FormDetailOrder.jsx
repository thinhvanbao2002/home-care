import { Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import ModalForm from '~/components/common/components/Modal';
import './formDetailOrder.css';
import { formatNumber, openNotificationSuccess } from '~/components/common/ultils';
import { updateOrder } from '~/services/admin/admin-order-service';

function FormDetailOrder({ isModalVisible, handleModalClose, data, getDataOrder }) {
    const [form] = Form.useForm();

    const [orderId, setOrderId] = useState(null);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(null);
    const [payStatus, setPayStatus] = useState(null);

    useEffect(() => {
        if (data) {
            setOrderId(data?.id);
            setStatus(data?.order_status);
            setProducts(data?.order_details);
            setPayStatus(data?.pay_type);
            form.setFieldsValue({
                name: data?.name,
                phone: data?.phone,
                quantity: data?.order_details?.length,
                total_price: data?.total_price,
                status: data?.order_status,
                address: data?.address,
                note: data?.note,
                pay_status: data?.pay_type === 'pay' ? 'Đã thanh toán' : 'Chưa thanh toán',
                // birth_day: moment(data?.birth_day, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                // wallet: data.customer?.customer_wallet?.balance,
                // cumulative_score: data?.customer?.cumulative_score,
            });
        }
    }, [data, form]);

    const handleSubmit = async () => {
        try {
            await updateOrder({ orderId, status });
            openNotificationSuccess('Thành công', 'Cập nhật đơn hàng thành công!');
            handleModalClose();
            getDataOrder();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ModalForm
                visible={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleSubmit}
                width={1000}
                title="Chi tiết đơn hàng"
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Họ và tên"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Số điện thoại"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="pay_status"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Trạng thái thanh toán"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Số lượng sản phẩm"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="total_price"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Tổng thanh toán"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item name="status" label="Trạng thái đơn hàng">
                                <Select
                                    placeholder="Trạng thái"
                                    style={{ width: '100%' }}
                                    allowClear
                                    onChange={(value) => {
                                        setStatus(value);
                                    }}
                                    value={status}
                                >
                                    <Select.Opt ion value="active">
                                        Đang hoạt động
                                    </Select.Opt>
                                    <Select.Option value="pending">Đang chờ xử lý</Select.Option>
                                    <Select.Option value="progress">Đang chuẩn bị hàng</Select.Option>
                                    <Select.Option value="confirmed">Đã chuẩn bị hàng</Select.Option>
                                    <Select.Option value="shiped">Đang giao hàng</Select.Option>
                                    <Select.Option value="completed">Đã hoàn thành</Select.Option>
                                    <Select.Option value="cancelled">Đã hủy</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                                label="Địa chỉ"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                // value={future}
                                // onChange={(e) => setFuture(e.target.value)}
                                name="note"
                                label="Ghi chú"
                            >
                                <Input.TextArea disabled rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <div className="list-order-by-user">
                                {products &&
                                    products.length > 0 &&
                                    products.map((item, index) => (
                                        <div key={index + 1} className="item-order-by-user">
                                            <div className="item-order-by-user-info">
                                                <img src={item?.product?.image} alt="" />
                                                <p>{item?.product?.name}</p>
                                            </div>
                                            <p className="item-order-by-user-quantity">{item?.quantity}</p>
                                            <p className="item-order-by-user-price">
                                                {formatNumber(Number(item?.price))}đ
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalForm>
        </>
    );
}

export default FormDetailOrder;
