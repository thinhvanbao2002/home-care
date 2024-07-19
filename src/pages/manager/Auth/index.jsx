import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './auth.css';

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="login-container">
            <Form className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <h2 className="login-title">Đăng nhập</h2>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        className="form-login-input-admin"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
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
