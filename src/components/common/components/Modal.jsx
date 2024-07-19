import { Modal } from 'antd';

function ModalForm({ visible, onClose, children, onSubmit, title }) {
    const handleOk = async () => {
        try {
            await onSubmit(); // Gọi hàm onSubmit từ bên ngoài
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Modal
                title={title}
                centered
                visible={visible}
                onOk={handleOk}
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
