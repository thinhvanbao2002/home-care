import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './success.css';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="success-container">
            <FaCheckCircle className="success-icon" />
            <h2>Đặt hàng thành công!</h2>
            <p style={{ marginTop: '10px' }}>Cảm ơn bạn đã đặt hàng tại homecare.</p>
            <Link style={{ marginTop: '10px' }} to={'/'}>
                Tiếp tục đặt hàng
            </Link>
        </div>
    );
};

export default SuccessPage;
