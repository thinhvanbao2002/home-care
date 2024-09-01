import './header.css';
function HeaderProfile() {
    return (
        <>
            <main className="profile-content">
                <div className="profile-main">
                    <h2>Hồ Sơ Của Tôi</h2>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    <form className="profile-form">
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input type="text" id="username" value="maisydat" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tên</label>
                            <input type="text" id="name" value="Mai Sỹ Đạt" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value="ms*******@gmail.com" disabled />
                            <a href="#" className="change-link">
                                Thay Đổi
                            </a>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="tel" id="phone" value="********33" disabled />
                            <a href="#" className="change-link">
                                Thay Đổi
                            </a>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Ngày sinh</label>
                            <input type="text" id="dob" value="**/03/20**" disabled />
                            <a href="#" className="change-link">
                                Thay Đổi
                            </a>
                        </div>
                        <button type="submit" className="save-btn">
                            Lưu
                        </button>
                    </form>
                </div>
                <div className="profile-avatar">
                    <img src="/logo.jpg" alt="Avatar" />
                    <button className="upload-btn">Chọn Ảnh</button>
                    <p>
                        Dung lượng file tối đa 1 MB
                        <br />
                        Định dạng: .JPEG, .PNG
                    </p>
                </div>
            </main>
        </>
    );
}

export default HeaderProfile;
