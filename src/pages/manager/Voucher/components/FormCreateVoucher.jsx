import { useState, useCallback } from 'react';
import { Form, Input, Row, Col, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import ModalForm from '~/components/common/components/Modal';
import { createVoucher } from '~/services/admin/admin-voucher-service';
import { openNotificationSuccess } from '~/components/common/ultils';
import { logDOM } from '@testing-library/react';

export const FormCreateVoucher = ({ isModalCreateVoucherVisible, handleModalClose, getDataVoucher }) => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [date, setDate] = useState(null);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [status, setStatus] = useState(true);
    const [endTime, setEndTime] = useState(null);

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            await createVoucher(name, endTime, discountPercent);
            openNotificationSuccess('Thành công', 'Thêm mới mã giảm giá thành công!');
            await getDataVoucher();
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            setDate(date);
            setEndTime(date.format('YYYY-MM-DD'));
        } else {
            setDate(null);
        }
    };

    const handleDiscountChange = (value) => {
        setDiscountPercent(value);
    };

    const resetForm = useCallback(() => {
        setName('');
        setDate(null);
        setDiscountPercent(0);
        setStatus(true);
        setEndTime(null);
        form.resetFields();
    }, [form]);

    return (
        <ModalForm
            visible={isModalCreateVoucherVisible}
            onClose={() => {
                handleModalClose();
                resetForm();
            }}
            onSubmit={handleSubmit}
            onReset={resetForm}
            width={500}
            title="Thêm mới mã giảm giá"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name,
                    setDate,
                    discountPercent,
                    status,
                }}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tiêu đề"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input placeholder="Nhập tiêu đề" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="endTime"
                            label="Ngày hết hạn"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày hết hạn!',
                                },
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
                                value={date ? moment(date) : null}
                                onChange={handleDateChange}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="discountPercent"
                            label="Phần trăm giảm giá"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập phần trăm giảm giá!',
                                },
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                    message: 'Phần trăm giảm giá phải từ 0 đến 100!',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="Nhập phần trăm giảm giá"
                                value={discountPercent}
                                onChange={handleDiscountChange}
                                min={0}
                                max={100}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </ModalForm>
    );
};
