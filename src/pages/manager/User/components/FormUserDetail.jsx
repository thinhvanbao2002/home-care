import { useCallback, useEffect, useState } from 'react';
import { uploadFile } from '~/services/instants/public-serbice';
import moment from 'moment';

import { updateCustomer } from '~/services/admin/admin-customer-service';
import { openNotification, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import UploadButton from '~/components/common/components/UploadButton';
import { Row, Col, Input, Form, Upload, Select } from 'antd';
import ModalForm from '~/components/common/components/Modal';

export const FormUserDetail = ({ isModalVisible, handleModalClose, data, getDataCustomers }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
        if (data) {
            setName(data?.name);
            setImageUrl(data?.avatar);
            setStatus(data?.status);
            setCustomerId(data?.id);
            form.setFieldsValue({
                name: data?.name,
                phone: data?.phone,
                role: data?.role,
                avatar: data?.avatar,
                email: data?.email,
                pass: data?.password,
                status: data?.status,
                birth_day: moment(data?.birth_day, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                wallet: data.customer?.customer_wallet?.balance,
                cumulative_score: data?.customer?.cumulative_score,
            });
        }
    }, [data, form]);

    const handleImageUpload = useCallback(
        async (info) => {
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

    const handleChangeSelectStatus = (value) => {
        setStatus(value);
    };

    // Xử lý cập nhật khách hàng
    const handleSubmit = async () => {
        try {
            await updateCustomer(customerId, name, imageUrl, status);
            form.resetFields();
            openNotificationSuccess('Thành công', 'Cập nhật người dùng thành công!');
            await getDataCustomers();
        } catch (error) {
            form.resetFields();
            openNotificationError('Thất bại', error.response.data.message);
        }
    };
    return (
        <ModalForm
            visible={isModalVisible}
            onClose={handleModalClose}
            onSubmit={handleSubmit}
            title="Chi tiết khách hàng"
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input placeholder="Nhập tên tài khoản a" />
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
                            name="wallet"
                            label="Số dư ví"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống ngày sinh!',
                                },
                            ]}
                        >
                            <Input placeholder="" disabled />
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
                                    <UploadButton />
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
                            name="status"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn quyền hạn!' }]}
                        >
                            <Select
                                placeholder="Trạng thái"
                                style={{ width: '100%' }}
                                allowClear
                                onChange={handleChangeSelectStatus}
                                value={status}
                            >
                                <Select.Option value="active">Đang hoạt động</Select.Option>
                                <Select.Option value="inactive">Ngưng hoạt động</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="birth_day"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Ngày sinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống ngày sinh!',
                                },
                            ]}
                        >
                            <Input placeholder="birth day" />
                        </Form.Item>

                        <Form.Item name="cumulative_score" label="Điểm tích lũy">
                            <Input placeholder="" disabled />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </ModalForm>
    );
};
