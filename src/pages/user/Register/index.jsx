import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Spin, DatePicker, Modal } from 'antd';
import './register.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { register } from '~/services/user/customer-service'; // Ensure verifyOtp function exists
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from '../Otp';
import { login } from '~/services/user/auth-service';
import { sendOtp, verifyOtp } from '~/services/user/otp.service';

function Register() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            //send OTP
            const formattedDateOfBirth = formatDateOfBirth(dateOfBirth);
                await register(name, phone, email, password, formattedDateOfBirth, address);
                openNotificationSuccess('Thành công', 'Đăng kí tài khoản thành công');
                navigate('/auth/login');
                setLoading(false);
        } catch (error) {
            console.log(error);
            openNotificationError('Thất bại', error.response.data.message);
            setLoading(false);
        }
    };

    const onOtpFinish = async () => {
        try {
            // const res = await verifyOtp({ phone, otp });
            // if (res.status && res.code === 200) {
                const formattedDateOfBirth = formatDateOfBirth(dateOfBirth);
                await register(name, phone, email, password, formattedDateOfBirth, address);
                openNotificationSuccess('Thành công', 'Đăng kí tài khoản thành công');
                navigate('/auth/login');
                setLoading(false);
                setOtpModalVisible(false);
                setOtp('');
            // } else {
            //     openNotificationError('Thất bại', 'Xác thực OTP không thành công');
            // }
        } catch (error) {
            console.log(error);

            openNotificationError('Thất bại', error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDateOfBirth = (dateString) => {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateString;
    };

    const validateConfirmPassword = (_, value) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject(new Error('Mật khẩu không khớp!'));
        }
        return Promise.resolve();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-user-container">
            <Row className="style-row-customer" justify="center" align="middle">
                <Col xs={22} sm={20} md={18} lg={16} xl={12} className="column-register">
                    <div className="logo-container">
                        <img onClick={() => navigate('/')} src="/logo-tl-house-v2.png" alt="" />
                        <Link to="/"></Link>
                    </div>
                    <div className="login-page-left-title">
                        <h3>Đăng kí tài khoản cho mọi dịch vụ của TL House</h3>
                    </div>
                    <div className="login-page-left-desc">
                        <p>
                            Đăng kí tài khoản TL House ngay và thực hiện mọi việc bạn cần từ một cổng dịch vụ duy nhất!
                        </p>
                    </div>

                    <Form
                        form={form}
                        className="register-form-customer"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ họ tên!' }]}
                        >
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-login-input-customer"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Họ và tên"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-login-input-customer"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Số điện thoại"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-login-input-customer"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-login-input-customer"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Địa chỉ"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="dob"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                onChange={(date, dateString) => setDateOfBirth(dateString)}
                                className="form-login-input-customer"
                                placeholder="Chọn ngày sinh"
                                format="DD-MM-YYYY"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    form.setFieldsValue({ password: e.target.value });
                                }}
                                className="form-login-input-customer"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            labelCol={{ span: 24 }}
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                { validator: validateConfirmPassword },
                            ]}
                        >
                            <Input.Password
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-login-input-customer"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Nhập lại mật khẩu"
                            />
                        </Form.Item>
                       <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                         <Form.Item>
                            <Button style={{width: '200px', height: '50px',background:'#e36b77'}} type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                Đăng kí
                            </Button>
                        </Form.Item>
                       </div>
                    </Form>

                    <Modal
                        title="Xác thực OTP"
                        visible={otpModalVisible}
                        onOk={onOtpFinish}
                        onCancel={() => {
                            setOtpModalVisible(false);
                            setLoading(false);
                            setOtp('');
                        }}
                        // confirmLoading={loading}
                    >
                        <OtpInput value={otp} onChange={setOtp} />
                    </Modal>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
