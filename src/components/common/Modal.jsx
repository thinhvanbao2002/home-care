import { Col, Input, Modal, Row, Select, Upload, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Children, useEffect, useState } from 'react';
import { getDetailCustomer } from '~/services/admin-customer-service';

function ModalForm({ visible, onClose, children }) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [customer, setCustomer] = useState();

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
                {children}
            </Modal>
        </>
    );
}

export default ModalForm;
