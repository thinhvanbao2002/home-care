import { useState } from 'react';
import './changepass.css';
import { openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { changePassword } from '~/services/user/auth-service';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    console.log(oldPassword);
    console.log(newPassword);
    console.log(rePassword);

    const handleChangePassword = async () => {
        try {
            await changePassword({ oldPassword, newPassword, rePassword });
            openNotificationSuccess('Thành công', 'Đổi mật khẩu thành công!');
        } catch (error) {
            openNotificationError('Thất bại', error.response.data.message);
            console.log(error);
        }
    };

    return (
        <>
            <>
                <div className="customer-change-password">
                    <div className="header-customer-change-password">
                        <h2>Đổi mật khẩu</h2>
                        <p>Quản lý thông tin đăng nhập</p>
                    </div>
                    <div className="content-customer-change-password" style={{ width: '900px' }}>
                        <div className="profile-form">
                            <div className="form-group">
                                <label htmlFor="name">Mật khẩu cũ</label>
                                <input
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    type="password"
                                    id="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Mật khẩu mới</label>
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ fontSize: '16px' }}
                                    type="password"
                                    id="email"
                                    // value={authJson.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Nhập lại</label>
                                <input
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    type="password"
                                    id="phone"
                                />
                            </div>
                            <button onClick={handleChangePassword} className="save-btn">
                                Lưu
                            </button>
                        </div>
                    </div>
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
