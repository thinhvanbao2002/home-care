import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Table,
    DatePicker,
    Input,
    Select,
    Row,
    Col,
    Tag,
    Pagination,
    Modal,
    Upload,
    Form,
    notification,
} from 'antd';
import './admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { createAdmin, deleteAdmin, fetchAllAdmin, getDetailAdmin, updateAdmin } from '~/services/admin/admin-service';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { uploadFile } from '~/services/instants/public-serbice';

const { RangePicker } = DatePicker;

// Notification configuration
const openNotification = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

// Notification configuration
const erorNotification = (message, description) => {
    notification.error({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

function Admin() {
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [changeSelectValue, setChangeSelectValue] = useState(null);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [total, setTotal] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [adminId, setAdminId] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    const handleImageUpload = useCallback(
        async (info) => {
            console.log(info);

            const file = info.file.originFileObj;
            if (file) {
                try {
                    const response = await uploadFile(file);
                    setImageUrl(response.data.absoluteUrl); // Đảm bảo rằng response.data.relativeUrl trả về URL đúng
                    console.log(response.data.absoluteUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        [setImageUrl],
    );

    // Xử lý date
    const handleDateChange = (dates) => {
        setDateRange(dates);
        if (dates && dates[0] && dates[1]) {
            setFromDate(dates[0].format('YYYY-MM-DD'));
            setToDate(dates[1].format('YYYY-MM-DD'));
        } else {
            setFromDate(null);
            setToDate(null);
        }
    };
    const handleSearchKeyword = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleChangeSelect = (value) => {
        setChangeSelectValue(value);
    };

    const handleChangeSelectRole = (value) => {
        setRole(value);
    };

    const handleChangeSelectStatus = (value) => {
        setStatus(value);
    };

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setTake(pagination.pageSize);
    };

    // Fetch All user admin
    useEffect(() => {
        getUserAdmin();
    }, [searchKeyword, changeSelectValue, dateRange, page, take]);

    // get list product
    const getUserAdmin = async () => {
        try {
            let res = await fetchAllAdmin(searchKeyword, changeSelectValue, fromDate, toDate, page, take);
            setDataAdmin(res.data);
            setTotal(res.meta.item_count);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (record) => {
        console.log('Click', record);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Ảnh đại diện</div>
        </div>
    );

    console.log(name);

    const handleOk = async () => {
        try {
            await form.validateFields();
            await createAdmin(name, phone, email, password, imageUrl, role, null);
            await getUserAdmin();
            openNotification('Thành công', 'Thêm mới tài khoản thành công!');
            setOpen(false);
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    const handleOkUpdate = async () => {
        try {
            await updateAdmin(adminId, name, imageUrl, status);
            openNotification('Thành công', 'Cập nhật thành công!');
            await getUserAdmin();
            setOpenUpdate(false);
        } catch (error) {
            form.resetFields();
            setImageUrl(null);
            setOpen(false);
            erorNotification('Thất bại', error.response.data.message);
        }
    };

    console.log(openUpdate);

    const handleOpenUpdate = async (amdinId) => {
        try {
            setOpenUpdate(true);
            const admin = await getDetailAdmin(amdinId);
            const data = admin.data;
            setAdminId(data.id);
            setName(data.name);
            setImageUrl(data.avatar);
            setPhone(data.phone);
            setRole(data.role);
            setPassword(data.password);
            setStatus(data.status);

            form.setFieldsValue({
                fullName: data.name,
                phone: data.phone,
                role: data.role,
                avatar: data.avatar,
                email: data.email,
                pass: data.password,
                status: data.status,
            });
        } catch (error) {
            form.resetFields();
            setImageUrl(null);
            setOpen(false);
            erorNotification('Thất bại', error.response.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAdmin(adminId);
            setDeleteModalVisible(false);
            openNotification('Thành công', 'Xóa thành công!');
            await getUserAdmin();
        } catch (error) {
            erorNotification('Thất bại', error.response.data.message);
        }
    };

    const columns = [
        {
            title: 'STT',
            width: 80,
            dataIndex: 'key',
            key: '0',
            fixed: 'left',
        },
        { title: 'Tên', dataIndex: 'name', key: '1', width: 200 },
        { title: 'Số điện thoại', dataIndex: 'phone', key: '2', width: 150 },
        { title: 'Quyền hạn', dataIndex: 'role', key: '4', width: 150 },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '3',
            width: 150,
            render: (text) => <Tag color={text === 'Đang hoạt động' ? 'blue' : 'red'}>{text}</Tag>,
        },
        { title: 'Ngày đăng nhập gần nhất', dataIndex: 'lastLogin', key: '5', width: 200 },
        { title: 'Ngày tạo', dataIndex: 'createdAt', key: '4', width: 150 },
        {
            width: 0,
            dataIndex: 'id',
            key: '5',
            fixed: 'left',
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type="button"
                        icon={<EditOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            marginRight: 20,
                            backgroundColor: '#FFCC33',
                        }}
                        size="large"
                        onClick={() => handleOpenUpdate(record.id)}
                    ></Button>
                    <Button
                        type="button"
                        icon={<DeleteOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            backgroundColor: '#FF3333',
                        }}
                        size="large"
                        onClick={() => {
                            setDeleteModalVisible(true);
                            setAdminId(record.id);
                        }}
                    ></Button>
                </span>
            ),
        },
    ];

    return (
        <>
            <Row gutter={16} align="middle" justify="space-between">
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Input
                                placeholder="Nội dung tìn kiếm"
                                style={{ width: '200px' }}
                                allowClear
                                value={searchKeyword}
                                onChange={handleSearchKeyword}
                            />
                        </Col>
                        <Col>
                            <Select
                                placeholder="Trạng thái"
                                style={{ width: '200px' }}
                                allowClear
                                onChange={handleChangeSelect}
                                value={changeSelectValue}
                            >
                                <Select.Option value="active">Đang hạt động</Select.Option>
                                <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                onChange={handleDateChange}
                                value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                onClick={() => setOpen(true)}
                            >
                                Thêm mới
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="button"
                                style={{ backgroundColor: '#009900', color: '#fff' }}
                                icon={<FileExcelFilled style={{ color: '#fff' }} />}
                            >
                                Xuất Excel
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Table
                style={{ marginTop: 40 }}
                columns={columns}
                dataSource={dataAdmin.map((data, index) => {
                    const realIndex = (page - 1) * take + index + 1;
                    return {
                        key: realIndex,
                        name: data.name,
                        phone: data.phone,
                        role: data.role === 'admin' ? 'Quản trị' : 'Nhân Viên',
                        status: data.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động',
                        lastLogin: data.last_login
                            ? moment(data.last_login, 'YYYY-MM-DD').format('DD/MM/YYYY')
                            : 'Chưa đăng nhập',
                        createdAt: moment(data.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        id: data.id,
                    };
                })}
                scroll={{ x: 1300 }}
                onRow={(record) => ({
                    onClick: () => handleClick(record),
                })}
                onChange={handleTableChange}
                pagination={{
                    current: page,
                    pageSize: take,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />

            <Modal
                title="Thêm mới tài khoản"
                centered
                open={open}
                onOk={handleOk}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                    setImageUrl(null);
                }}
                width={1000}
                className="custom-modal"
                maskClosable={false}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                value={name}
                                name="fullName"
                                label="Họ và tên"
                                onChange={(e) => setName(e.target.value)}
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                label="Số điện thoại"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                    { pattern: /^\d{10}$/, message: 'Số điện thoại phải là 10 chữ số!' },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="avatar"
                                label="Ảnh đại diện"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện!' }]}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={() => true} // Ensure this returns true to allow upload
                                    onChange={handleImageUpload}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
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
                                <Input placeholder="abcd@gmail.com" />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label="Quyền hạn"
                                rules={[{ required: true, message: 'Vui lòng chọn quyền hạn!' }]}
                            >
                                <Select
                                    placeholder="Trạng thái"
                                    style={{ width: '100%' }}
                                    allowClear
                                    onChange={handleChangeSelectRole}
                                    value={changeSelectValue}
                                >
                                    <Select.Option value="admin">Quản trị</Select.Option>
                                    <Select.Option value="staff">Nhân viên</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập password!',
                                    },
                                ]}
                            >
                                <Input placeholder="password" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title="Cập nhật tài khoản"
                centered
                open={openUpdate}
                onOk={handleOkUpdate}
                onCancel={() => {
                    setOpenUpdate(false);
                    form.resetFields();
                    setImageUrl(null);
                }}
                width={1000}
                className="custom-modal"
                maskClosable={false}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="fullName"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                label="Số điện thoại"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                    { pattern: /^\d{10}$/, message: 'Số điện thoại phải là 10 chữ số!' },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" disabled />
                            </Form.Item>

                            <Form.Item
                                name="avatar"
                                label="Ảnh đại diện"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện!' }]}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={() => true} // Ensure this returns true to allow upload
                                    onChange={handleImageUpload}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
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
                                <Input placeholder="EnterEmail@gmail.com" disabled />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label="Quyền hạn"
                                rules={[{ required: true, message: 'Vui lòng chọn quyền hạn!' }]}
                            >
                                <Select
                                    placeholder="Quyền hạn"
                                    style={{ width: '100%' }}
                                    allowClear
                                    onChange={handleChangeSelectRole}
                                    value={changeSelectValue}
                                >
                                    <Select.Option value="admin">Quản trị</Select.Option>
                                    <Select.Option value="staff">Nhân viên</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="status"
                                label="Trạng thái"
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            >
                                <Select
                                    placeholder="Trạng thái"
                                    style={{ width: '100%' }}
                                    allowClear
                                    onChange={handleChangeSelectStatus}
                                    value={status}
                                >
                                    <Select.Option value="active">Hoạt động</Select.Option>
                                    <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FF3333', fontSize: '24px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '20px' }}>Xác nhận xóa</span>
                    </div>
                }
                visible={deleteModalVisible}
                onOk={handleDelete} // Define this function to handle delete action
                onCancel={() => setDeleteModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                centered // Center the modal vertically
            >
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn xóa?</p>
            </Modal>
        </>
    );
}

export default Admin;
