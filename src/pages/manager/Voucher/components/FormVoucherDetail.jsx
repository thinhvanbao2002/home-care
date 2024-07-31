import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Input, Row, Col, Select, DatePicker } from 'antd';
import ModalForm from '~/components/common/components/Modal';
import { updateVoucher } from '~/services/admin/admin-voucher-service';
import { openNotificationSuccess } from '~/components/common/ultils';

export const FormVoucherDetail = ({ isModalVisible, handleModalClose, data, getDataVoucher }) => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [endTime, setEndTime] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    // const [status, setStatus] = useState(true);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (data) {
            const endTimeMoment = data?.end_time ? moment(data?.end_time) : null;
            setName(data?.name);
            setEndTime(data?.end_time);
            setDiscountPercent(data?.discount_percent);
            // setStatus(data?.status);
            setDate(endTimeMoment);
            form.setFieldsValue({
                name: data?.name,
                endTime: endTimeMoment,
                discountPercent: data?.discount_percent,
                // status: data?.status,
            });
        }
    }, [data, form]);

    const handleDateChange = (date) => {
        setDate(date);
        setEndTime(date ? date.format('DD-MM-YYYY') : '');
    };

    const handleSubmit = async () => {
        try {
            await updateVoucher(data?.id, name, endTime, discountPercent);
            await getDataVoucher();
            openNotificationSuccess('Thành công', 'Cập nhật mã giảm giá thành công!');
        } catch (error) {
            console.log(error);
        }
    };

    // const handleChangeSelectStatus = (value) => {
    //     setStatus(value);
    // };

    return (
        <>
            <ModalForm
                visible={isModalVisible}
                onClose={handleModalClose}
                onSubmit={handleSubmit}
                title="Chi tiết mã giảm giá"
                width={500}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Tiêu đề"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input
                                    placeholder="Nhập tên tài khoản"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="endTime"
                                label="Ngày hết hạn"
                                rules={[
                                    { required: true, message: 'Vui lòng chọn ngày hết hạn!' },
                                    {
                                        validator: (_, value) =>
                                            value && value.isAfter(moment())
                                                ? Promise.resolve()
                                                : Promise.reject('Ngày hết hạn phải là ngày trong tương lai!'),
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="Chọn ngày hết hạn"
                                    format="DD-MM-YYYY"
                                    value={date}
                                    onChange={handleDateChange}
                                />
                            </Form.Item>

                            {/* <Form.Item
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
                                    <Select.Option value={true}>Đang hoạt động</Select.Option>
                                    <Select.Option value={false}>Ngưng hoạt động</Select.Option>
                                </Select>
                            </Form.Item> */}

                            <Form.Item
                                name="discountPercent"
                                label="Phần trăm giảm giá"
                                rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá!' }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Nhập phần trăm giảm giá"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </ModalForm>
        </>
    );
};
