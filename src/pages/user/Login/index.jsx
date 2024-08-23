import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { login } from '~/services/user/auth-service';
import { openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { store } from '~/redux/store/store';
import { setAuth } from '~/redux/slide/authSlide';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Xử lý login
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const res = await login(email, password);
            openNotificationSuccess('Thành công', 'Đăng nhập thành công');
            store.dispatch(setAuth(res.data));
            setLoading(false);
            navigate('/');
        } catch (error) {
            openNotificationError('Thất bại', error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-user-container">
                <Row className="style-row" justify="center" align="middle">
                    <Col xs={0} sm={0} md={0} lg={6} xl={6} className="column1" style={{ height: '600px' }}>
                        <div className="logo-container" onClick={() => navigate('/')}>
                            <img src="/logo-homecare.jpg" alt="" />
                        </div>
                        <div
                            style={{ lineHeight: '32px', fontSize: '26px', textAlign: 'center', marginBottom: '40px' }}
                        >
                            <h3>Một tài khoản cho mọi dịch vụ của HomeCare</h3>
                        </div>
                        <div className="login-page-left-desc">
                            <p>Đăng nhập tài khoản ASUS và thực hiện mọi việc bạn cần từ một cổng dịch vụ duy nhất!</p>
                        </div>
                    </Col>
                    <Col xs={20} sm={14} md={12} lg={8} xl={8} className="column2" style={{ height: '600px' }}>
                        <Spin spinning={loading} tip="Loading...">
                            <Form
                                className="login-form-customer"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <div className="logo-container-right">
                                    <img src="/logo-homecare.jpg" alt="" />
                                </div>
                                <h2 className="login-title-customer">Đăng nhập Tài khoản</h2>
                                <Form.Item
                                    label="Email"
                                    name="enterEmai"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
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
                                    label="Mật khẩu"
                                    name="password"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                >
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-login-input-customer"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Nhớ tôi</Checkbox>
                                        </Form.Item>
                                        <a className="login-form-forgot" href="">
                                            Quên mật khẩu của bạn?
                                        </a>
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button-customer">
                                        Đăng nhập
                                    </Button>
                                    <Link to="/customer/register">Đăng kí tài khoản!</Link>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default UserLogin;
