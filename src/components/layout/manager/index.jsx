import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    HomeOutlined,
    ProductOutlined,
    UnorderedListOutlined,
    GiftOutlined,
    ImportOutlined,
    QrcodeOutlined,
    BellOutlined,
    BellFilled,
    UsergroupDeleteOutlined,
    NotificationFilled,
} from '@ant-design/icons';
import { Badge, Button, Layout, Menu, theme } from 'antd';
import './manager-layout.css';

const { Header, Sider, Content } = Layout;

function ManagerLayout({ children }) {
    const [collapsed, setCollapsed] = useState(true);
    const [title, setTitle] = useState('Tổng quan'); // Khởi tạo tiêu đề mặc định
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (key, title) => {
        setTitle(title);
    };

    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <Sider className="sider-bar-admin" trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="0"></Menu.Item>
                    <Menu.Item key="1" onClick={() => handleMenuClick('1', 'Tổng quan')}>
                        <Link to="/admin">
                            <HomeOutlined />
                            <span>Tổng quan</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => handleMenuClick('2', 'Quản lý nhân sự')}>
                        <Link to="/admin/staff">
                            <UserOutlined />
                            <span>Quản lý nhân sự</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => handleMenuClick('3', 'Quản lý khách hàng')}>
                        <Link to="/admin/customers">
                            <UsergroupDeleteOutlined />
                            <span>Quản lý khách hàng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => handleMenuClick('4', 'Quản lý sản phẩm')}>
                        <Link to="/admin/product">
                            <ProductOutlined />
                            <span>Quản lý sản phẩm</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => handleMenuClick('5', 'Quản lý danh mục')}>
                        <Link to="/admin/category">
                            <UnorderedListOutlined />
                            <span>Quản lý danh mục</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" onClick={() => handleMenuClick('6', 'Quản lý mã giảm giá')}>
                        <Link to="/admin/voucher">
                            <QrcodeOutlined />
                            <span>Quản lý mã giảm giá</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7" onClick={() => handleMenuClick('7', 'Quản lý nhập hàng')}>
                        <Link to="/admin/inventory">
                            <ImportOutlined />
                            <span>Quản lý nhập hàng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8" onClick={() => handleMenuClick('8', 'Quản lý khuyến mãi')}>
                        <Link to="/admin/gift">
                            <GiftOutlined />
                            <span>Quản lý quà tặng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="9" onClick={() => handleMenuClick('9', 'Quản lý thông báo')}>
                        <Link to="/admin/notification">
                            <NotificationFilled />
                            <span>Quản lý thông báo</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10" onClick={() => handleMenuClick('10', 'Quản lý tin tức')}>
                        <Link to="/admin/new">
                            <BellFilled style={{ fontSize: '16px' }} />
                            <span>Quản lý tin tức</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        paddingLeft: 0,
                        paddingRight: 18,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
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
                        <span className="admin-header-title">{title}</span> {/* Hiển thị tiêu đề động */}
                    </div>
                    <Badge style={{ fontSize: '10px' }} count={2} overflowCount={99}>
                        <BellOutlined style={{ fontSize: '20px' }} />
                    </Badge>
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
                    <div className="content-body">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ManagerLayout;
