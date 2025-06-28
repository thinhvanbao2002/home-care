import React, { useEffect, useState } from 'react';
import { Input, Radio, Select, Button, Form, Row, Col, Typography, message, Modal } from 'antd';
import './order.css';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { formatNumber } from '~/components/common/ultils';
import { createOrder } from '~/services/user/order-service';
import { useSelector } from 'react-redux';
import { fetchAllAdress } from '~/services/user/customer-info-service';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function Order() {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
    const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
    const [saveAddress, setSaveAddress] = useState(false);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const products = location.state?.products || [];
    const [totalAmount, setTotalAmount] = useState(0);
    const [customerAddresses, setCustomerAddresses] = useState([]);

    const auth = useSelector((state) => state.auth.user);
    const userAuth = typeof auth === 'string' ? JSON.parse(auth) : auth;

    console.log('---- USER AUTH ----');
    

    const url = process.env.REACT_APP_API_BASE_URL;

    console.log(url);

    const handleSubmit = async () => {
        form.validateFields()
            .then(async (values) => {
                console.log('Form Values:', values);

                const orderData = {
                    name: values.fullName,
                    phone: values.phoneNumber,
                    address: values.address,
                    note: values.addressNote,
                    customerId: userAuth.id,
                    totalPrice: totalAmount,
                    items: products,
                    pay_type: 'notpay',
                };

                if (paymentMethod === 'cod') {
                    await createOrder(orderData);
                    navigate('/order-success');
                } else if (paymentMethod === 'bankTransfer') {
                    navigate('/u/qr-pay', { state: { orderData } });
                }
            })
            .catch(() => {
                message.error('Vui lòng điền đầy đủ thông tin trước khi đặt hàng.');
            });
    };

    useEffect(() => {
        const total = products.reduce((acc, product) => acc + product.totalPrice, 0);
        setTotalAmount(total);
        getAllAddress();
    }, [products]);

    console.log(customerAddresses);
    console.log(phone);
    console.log(name);
    console.log(address);

    const getAllAddress = async () => {
        try {
            const res = await fetchAllAdress();
            setCustomerAddresses(res?.data);

            // Automatically fill in the default address (is_default = true)
            const defaultAddress = res?.data?.find((addr) => addr.is_default);

            console.log(defaultAddress);

            if (defaultAddress) {
                setName(defaultAddress.customer_name);
                setPhone(defaultAddress.customer_phone);
                setAddress(defaultAddress.customer_address);
                form.setFieldsValue({
                    fullName: defaultAddress.customer_name,
                    phoneNumber: defaultAddress.customer_phone,
                    address: defaultAddress.customer_address,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChooseAddress = async (item) => {
        try {
            setName(item.customer_name);
            setPhone(item?.customer_phone);
            setAddress(item?.customer_address);
            form.setFieldsValue({
                fullName: item?.customer_name,
                phoneNumber: item?.customer_phone,
                address: item?.customer_address,
            });
            handleAddressModalCancel();
        } catch (error) {
            console.log(error);
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSaveAddressChange = (e) => {
        setSaveAddress(e.target.value);
    };

    const handleAddressSelect = () => {
        setAddressModalVisible(true);
    };

    const handleAddressModalOk = () => {
        setAddressModalVisible(false);
    };

    const handleAddressModalCancel = () => {
        setAddressModalVisible(false);
    };

    return (
        <div className="purchase-container">
            <div className="purchase-address">
                <Title level={2}>Địa Chỉ Nhận Hàng</Title>
                <Form layout="vertical" className="purchase-form-address" form={form}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập họ và tên"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Ghi chú địa chỉ" name="addressNote">
                        <TextArea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Nhập ghi chú địa chỉ"
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group onChange={handleSaveAddressChange} value={saveAddress}>
                            {/* <Radio value={true}>Lưu địa chỉ này</Radio> */}
                            <Button onClick={handleAddressSelect}>Chọn địa chỉ có sẵn</Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>

            <div className="purchase-product">
                <Title level={3}>Sản phẩm</Title>
                {products &&
                    products.length > 0 &&
                    products.map((product) => (
                        <div className="purchase-product-details" key={product.id}>
                            <img src={product.image} alt="Product Image" />
                            <div className="purchase-product-info">
                                <Paragraph>{product.name}</Paragraph>
                                <span style={{color:  '#e36b77'}} className="purchase-price">{formatNumber(Number(product.price))}</span>
                            </div>
                            <div className="purchase-quantity">
                                <span  style={{color:  '#e36b77'}}>{product.quantity}</span>
                            </div>
                            <div className="purchase-total">
                                <span style={{color:  '#e36b77'}}>{formatNumber(Number(product.totalPrice))}</span>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="purchase-payment-methods">
                <Title level={3}>Phương thức thanh toán</Title>
                <div className="purchase-methods">
                    <button
                        type={paymentMethod === 'cod' ? 'primary' : 'default'}
                        onClick={() => handlePaymentMethodChange('cod')}
                        className={paymentMethod === 'cod' ? 'active' : ''}
                    >
                        Thanh toán khi nhận hàng
                    </button>
                </div>
            </div>

            <div className="purchase-summary">
                <div className="purchase-summary-details">
                    <Paragraph>
                        Tổng tiền: <span className="purchase-total-amount">{formatNumber(Number(totalAmount))}</span>
                    </Paragraph>
                    <Button style={{background:'#e36b77', color: '#fff'}} className="purchase-summary-button" onClick={handleSubmit}>
                        Đặt hàng
                    </Button>
                </div>
            </div>

            <Modal
                title="CHỌN ĐỊA CHỈ GIAO HÀNG"
                visible={addressModalVisible}
                onOk={handleAddressModalOk}
                onCancel={handleAddressModalCancel}
                width={1000}
            >
                {customerAddresses &&
                    customerAddresses.length > 0 &&
                    customerAddresses.map((item, index) => (
                        <div key={index + 1} onClick={() => handleChooseAddress(item)} className="user-address-order">
                            <h4>{item?.customer_name}</h4> | <h5>{item?.customer_phone}</h5> |{' '}
                            <span>{item?.customer_address}</span>
                        </div>
                    ))}
            </Modal>
        </div>
    );
}

export default Order;
