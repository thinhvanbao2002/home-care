import { Modal } from 'antd';

function ModalForm({ visible, onClose, children, onSubmit, title, width, onReset }) {
    const handleOk = async () => {
        try {
            const isSubmitSuccessful = await onSubmit(); // Gọi hàm onSubmit từ bên ngoài

            console.log('isSubmitSuccessful', isSubmitSuccessful);

            if (isSubmitSuccessful) {
                onClose(); // Chỉ đóng modal khi submit thành công
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        onClose();
        if (onReset) {
            onReset(); // Reset form khi modal đóng
        }
    };

    return (
        <Modal
            title={title}
            centered
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width}
            className="custom-modal"
            maskClosable={false}
            okText="Xác nhận"
            cancelText="Hủy bỏ"
        >
            {children}
        </Modal>
    );
}

export default ModalForm;
