import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { uploadFile } from '~/services/instants/public-serbice';
import { updateInfo } from '~/services/user/user-info.service';
import { openNotificationSuccess } from '~/components/common/ultils';
import { store } from '~/redux/store/store';
import { setAuth } from '~/redux/slide/authSlide';

function CustomerInfo() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state?.auth?.user);
    const authJson = typeof auth === 'string' ? JSON.parse(auth) : auth;

    // State to store the uploaded image URL
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(''); // Default image
    const [name, setName] = useState('');

    useEffect(() => {
        setImageUrl(authJson.avatar ? authJson.avatar : '/user.png');
        setName(authJson.name);
    }, []);

    // Custom function to handle file upload
    const handleUpload = async (file) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await uploadFile(file);
            // Assuming the response contains the URL of the uploaded image
            setImageUrl(response.data.absoluteUrl);
            message.success('Ảnh đã được tải lên thành công!');
        } catch (error) {
            console.error('Lỗi khi tải lên ảnh:', error);
            message.error('Có lỗi xảy ra khi tải lên ảnh.');
        } finally {
            setLoading(false);
        }
    };

    console.log(imageUrl);
    console.log(name);

    const handleImageUpload = useCallback(
        async (info) => {
            const file = info.file.originFileObj;
            if (file) {
                try {
                    const response = await uploadFile(file);
                    setImageUrl(response.data.absoluteUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        [setImageUrl],
    );

    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            // const res = await uploadFile();
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            handleUpload(info.file.originFileObj);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            console.log(name);
            console.log(imageUrl);

            const updatedUserInfo = { name, avatar: imageUrl };
            await updateInfo(updatedUserInfo);
            store.dispatch(setAuth({ ...authJson, ...updatedUserInfo }));

            openNotificationSuccess('Thành công', 'Cập nhật thông tin thành công!');
        } catch (error) {
            console.log(error);
        }
    };

    // Render upload button with loading indicator
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
        </div>
    );

    return (
        <>
            <main className="profile-content">
                <div className="profile-main">
                    <h2>Hồ Sơ Của Tôi</h2>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    <div className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Tên</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" id="name" value={name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                style={{ fontSize: '16px' }}
                                type="email"
                                id="email"
                                value={authJson.email}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input type="tel" id="phone" value={authJson.phone} readOnly disabled />
                        </div>
                        <button onClick={handleUpdateInfo} className="save-btn">
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="profile-avatar">
                    {/* <div className="avatar-container">
                        <img src={imageUrl} alt="Avatar" className="avatar-preview" />
                    </div> */}
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleImageUpload}
                    >
                        {imageUrl ? <img src={imageUrl} alt="Avatar" /> : uploadButton}
                    </Upload>
                </div>
            </main>
        </>
    );
}

export default CustomerInfo;
