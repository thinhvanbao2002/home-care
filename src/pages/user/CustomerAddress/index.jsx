import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './customer-address.css';
import { useEffect, useState } from 'react';
import { createAddress, fetchAllAdress } from '~/services/user/customer-info-service';
import { Input, Row, Col, Modal, Form } from 'antd';
import { openNotificationSuccess } from '~/components/common/ultils';
function CustomerAddress() {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [customerAddress, setCustomerAddress] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        getAllCustomerAddress();
    }, []);

    const getAllCustomerAddress = async () => {
        try {
            const res = await fetchAllAdress();
            setCustomerAddress(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateCustomerAddress = async () => {
        try {
            await createAddress({ name, phone, address });
            openNotificationSuccess('Thành công', 'Thêm địa chỉ thành công');
            getAllCustomerAddress();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="customer-address">
                <div className="header-customer-address">
                    <h2>Địa chỉ của bạn</h2>
                    <p>Quản lý thông tin địa chỉ mua hàng</p>
                </div>
                <div className="content-customer-address">
                    <div className="customer-address-operation">
                        <button onClick={() => setOpen(true)}>Thêm mới</button>
                    </div>
                    <div className="customer-address-list">
                        {customerAddress &&
                            customerAddress.length > 0 &&
                            customerAddress.map((item, index) => (
                                <div className="customer-address-item" key={index}>
                                    <div className="customer-address-item-left">
                                        <div className="address-item-name-phone">
                                            <p className="address-item-name">{item.customer_name}</p>
                                            <span></span>
                                            <p className="address-item-phone">{item.customer_phone}</p>
                                        </div>
                                        <div className="address-item-address">
                                            <p>{item.customer_address}</p>
                                        </div>
                                        <div
                                            className={`address-item-defatlt ${
                                                item.is_default ? 'address-item-defatlt-active' : ''
                                            }`}
                                        >
                                            Mặc định
                                        </div>
                                    </div>
                                    <div className="customer-address-item-right">
                                        <button className="customer-address-btn-update">Cập nhật</button>
                                        <button className="customer-address-btn-is-default">Đặt làm mặc định</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <Modal
                    title="Thêm mới địa chỉ"
                    centered
                    open={open}
                    onOk={() => {
                        setOpen(false);
                        handleCreateCustomerAddress();
                    }}
                    onCancel={() => setOpen(false)}
                    width={500}
                >
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    value={name}
                                    name="fullName"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                >
                                    <Input onChange={(e) => setName(e.target.value)} placeholder="Nhập tên tài khoản" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    value={phone}
                                    label="Số điện thoại"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^\d{10}$/, message: 'Số điện thoại phải là 10 chữ số!' },
                                    ]}
                                >
                                    <Input
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Item>
                                <Form.Item name="address" value={address} label="Địa chỉ">
                                    <Input
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default CustomerAddress;
