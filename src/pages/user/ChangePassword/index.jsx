import './changepass.css';

function ChangePassword() {
    return (
        <>
            <>
                <div className="customer-change-password">
                    <div className="header-customer-change-password">
                        <h2>Đổi mật khẩu</h2>
                        <p>Quản lý thông tin đăng nhập</p>
                    </div>
                    <div className="content-customer-change-password"></div>
                    {/* <Modal
                    title="Thêm mới địa chỉ"
                    centered
                    open={open}
                    onOk={() => {
                        setOpen(false);
                        handleCreateCustomerAddress();
                    }}
                    onCancel={() => setOpen(false)}
                    width={500}
                >
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    value={name}
                                    name="fullName"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                >
                                    <Input onChange={(e) => setName(e.target.value)} placeholder="Nhập tên tài khoản" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    value={phone}
                                    label="Số điện thoại"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                        { pattern: /^\d{10}$/, message: 'Số điện thoại phải là 10 chữ số!' },
                                    ]}
                                >
                                    <Input
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Item>
                                <Form.Item name="address" value={address} label="Địa chỉ">
                                    <Input
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal> */}
                </div>
            </>
        </>
    );
}

export default ChangePassword;
