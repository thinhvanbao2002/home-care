import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Admin from '~/pages/manager/Admin';
import User from '~/pages/manager/User';
import './manager-layout.css';

const { Header, Sider, Content } = Layout;

function ManagerLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('1');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const renderContent = () => {
        switch (selectedComponent) {
            case '1':
                return <Admin />;
            case '2':
                return <User />;
            // Thêm các case cho các component khác
            default:
                return <Admin />;
        }
    };

    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => setSelectedComponent(key)}
                    items={[
                        {
                            key: '0',
                            label: 'Admin',
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Tổng quan',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Quản lý tài khoản',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Quản lý người dùng',
                        },
                        {
                            key: '4',
                            icon: <VideoCameraOutlined />,
                            label: 'Quản lý sản phẩm',
                        },
                        {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: 'Quản lý danh mục',
                        },
                        {
                            key: '6',
                            icon: <UploadOutlined />,
                            label: 'Quản lý mã giảm giá',
                        },
                        {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: 'Quản lý nhập hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    className="layout-content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className="content-body">{renderContent()}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ManagerLayout;
