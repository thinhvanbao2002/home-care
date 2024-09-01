import './profile.css';
function Profile() {
    return (
        <>
            <div className="container-profile">
                <aside className="sidebar-profile">
                    <div className="profile-info">
                        <img src="/logo.jpg" alt="Profile Picture" />
                        <p className="username">maisydat</p>
                        <a href="#" className="edit-profile">
                            Sửa Hồ Sơ
                        </a>
                    </div>
                    <nav className="menu">
                        <ul>
                            <li className="menu-item">
                                <a href="#">Tài Khoản Của Tôi</a>
                            </li>
                            <li className="menu-item active">
                                <a href="#">Hồ Sơ</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Ngân Hàng</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Địa Chỉ</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Đổi Mật Khẩu</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Cài Đặt Thông Báo</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Những Thiết Lập Riêng Tư</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Đơn Mua</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Thông Báo</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Kho Voucher</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Shopee Xu</a>
                            </li>
                        </ul>
                    </nav>
                </aside>
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
                            {/* <div className="form-group">
                                <label>Giới tính</label>
                                <div className="radio-group">
                                    <input type="radio" name="gender" id="male" checked /> Nam
                                    <input type="radio" name="gender" id="female" /> Nữ
                                    <input type="radio" name="gender" id="other" /> Khác
                                </div>
                            </div> */}
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
            </div>
        </>
    );
}

export default Profile;
