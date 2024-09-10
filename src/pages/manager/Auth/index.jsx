import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import { openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { setAuthAdmin } from '~/redux/slide/authAdminSlide';
import { loginAdmin } from '~/services/admin/auth-admin-service';
import { store } from '~/redux/store/store';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Xử lý login
    const onFinish = async (values) => {
        try {
            // setLoading(true);
            const res = await loginAdmin(email, password);
            openNotificationSuccess('Thành công', 'Đăng nhập thành công');

            // console.log(res.data);

            if (res && res.data) {
                console.log(res.data);

                store.dispatch(setAuthAdmin(res.data));
                localStorage.setItem('admin-token', res?.data?.token);
                localStorage.setItem('authDataAdmin', JSON.stringify(res?.data));
                navigate('/admin');
            }
            // // setLoading(false);
        } catch (error) {
            openNotificationError('Thất bại', error.response.data.message);
            // setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Form className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <h2 className="login-title">Đăng nhập</h2>
                <Form.Item
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input
                        className="form-login-input-admin"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    labelCol={{ span: 24 }}
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}
                >
                    <Input
                        className="form-login-input-admin"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item className="form-btn-login-admin">
                    <Button
                        style={{ marginTop: '20px', height: '40px' }}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button-admin"
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
