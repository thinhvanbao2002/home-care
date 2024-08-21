import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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
import logo from './logo-homecare.jpg'; // Đảm bảo bạn đã có file logo ở đường dẫn này

const { Header, Sider, Content } = Layout;

function ManagerLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [title, setTitle] = useState('Tổng quan'); // Khởi tạo tiêu đề mặc định
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Cập nhật tiêu đề dựa trên đường dẫn hiện tại
    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case '/admin':
                setTitle('Tổng quan');
                break;
            case '/admin/staff':
                setTitle('Quản lý nhân sự');
                break;
            case '/admin/customers':
                setTitle('Quản lý khách hàng');
                break;
            case '/admin/product':
                setTitle('Quản lý sản phẩm');
                break;
            case '/admin/category':
                setTitle('Quản lý danh mục');
                break;
            case '/admin/voucher':
                setTitle('Quản lý mã giảm giá');
                break;
            case '/admin/inventory':
                setTitle('Quản lý nhập hàng');
                break;
            case '/admin/gift':
                setTitle('Quản lý khuyến mãi');
                break;
            case '/admin/notification':
                setTitle('Quản lý thông báo');
                break;
            case '/admin/new':
                setTitle('Quản lý tin tức');
                break;
            default:
                setTitle('Tổng quan');
        }
    }, [location.pathname]);

    const menuItems = [
        { key: '1', icon: <HomeOutlined />, label: 'Tổng quan', path: '/admin' },
        { key: '2', icon: <UserOutlined />, label: 'Quản lý nhân sự', path: '/admin/staff' },
        { key: '3', icon: <UsergroupDeleteOutlined />, label: 'Quản lý khách hàng', path: '/admin/customers' },
        { key: '4', icon: <ProductOutlined />, label: 'Quản lý sản phẩm', path: '/admin/product' },
        { key: '5', icon: <UnorderedListOutlined />, label: 'Quản lý danh mục', path: '/admin/category' },
        { key: '6', icon: <QrcodeOutlined />, label: 'Quản lý mã giảm giá', path: '/admin/voucher' },
        { key: '7', icon: <ImportOutlined />, label: 'Quản lý nhập hàng', path: '/admin/inventory' },
        { key: '8', icon: <GiftOutlined />, label: 'Quản lý khuyến mãi', path: '/admin/gift' },
        { key: '9', icon: <NotificationFilled />, label: 'Quản lý thông báo', path: '/admin/notification' },
        { key: '10', icon: <BellFilled style={{ fontSize: '16px' }} />, label: 'Quản lý tin tức', path: '/admin/new' },
    ];

    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <Sider className="sider-bar-admin" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo-container">
                    <img
                        style={{ margin: '0', marginTop: '20px', width: '80%' }}
                        src="/logo-homecare.jpg"
                        alt="Logo"
                        className="logo"
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[menuItems.find((item) => item.path === location.pathname)?.key]}
                >
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
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
