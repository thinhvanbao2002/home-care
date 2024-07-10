import { Col, Input, Modal, Row, Select, Upload, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getDetailCustomer } from '~/services/admin-customer-service';

function UserDetailModal({ visible, onClose, selectedUser }) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [customer, setCustomer] = useState();

    const getDetailCustomer = async () => {
        try {
            const res = await getDetailCustomer(selectedUser);
            setCustomer(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Ảnh đại diện</div>
        </div>
    );
    const handleOK = () => {};

    return (
        <>
            <Modal
                title="Chi tiết khách hàng"
                centered
                visible={visible}
                onOk={() => {
                    handleOK();
                    onClose();
                }}
                onCancel={onClose}
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
                                value={''}
                                // onChange={(e) => setName(e.target.value)}
                                name="fullName"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                // value={phone}
                                // onChange={}
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
                                    // onChange={handleImageUpload}
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
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
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
                                <Input placeholder="EnterEmail@gmail.com" />
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
                                    // onChange={handleChangeSelectRole}
                                    // value={changeSelectValue}
                                >
                                    <Select.Option value="admin">Quản trị</Select.Option>
                                    <Select.Option value="staff">Nhân viên</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="pass"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
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
        </>
    );
}

export default UserDetailModal;
