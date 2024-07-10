import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './auth.css';

function Auth() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        // Simulate a login API call
        setTimeout(() => {
            setLoading(false);
            console.log('Logged in');
        }, 2000); // Adjust this timeout to your needs
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth-model">
                    <h3 style={{ fontSize: '32px', fontWeight: '500' }}>Đăng nhập</h3>
                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                            ]}
                        >
                            <Input className="custom-input" placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input.Password className="custom-input" placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="custom-input" loading={loading}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Auth;
