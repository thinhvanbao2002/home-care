import { useEffect } from 'react';
import './qrpay.css';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '~/services/instants/types/instant';
import { useSelector } from 'react-redux';
import { formatNumber } from '~/components/common/ultils';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '~/services/user/order-service';
import socket from '~/socket-client';

function QrPaymen() {
    const location = useLocation();
    const navigate = useNavigate();
    // Lấy dữ liệu orderData từ state
    const { orderData } = location.state || {};
    const auth = useSelector((state) => state?.auth?.user);
    const userAuth = typeof auth === 'string' ? JSON.parse(auth) : auth;

    useEffect(() => {
        // Initialize the socket connection
        const socket = io(API_BASE_URL.URL_SOCKET, {
            auth: {
                token: localStorage.getItem('user-token'), // Replace with actual token
            },
        });

        // Handle the paysuccess event
        socket.on('paysuccess', async (data) => {
            console.log('Payment success data:', data);
            orderData.pay_type = 'pay';

            console.log(orderData);

            await createOrder(orderData);
            navigate('/order-success');
        });

        // Clean up the socket connection when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []); // Dependency array should be empty to only set up the socket connection once

    return (
        <>
            <div className="wrapper-qrpay">
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <img
                        src={`https://qr.sepay.vn/img?acc=7888866662002&bank=MBBank&amount=${orderData?.totalPrice}&des=MKH${userAuth?.id}`}
                        alt=""
                    />
                    <div className="qr-pay-brand-name">
                        <p>Ngân hàng: MB bank</p>
                    </div>
                    <div className="qr-pay-user-name">
                        <p>Chủ tài khoản: THỊNH VĂN BẢO</p>
                    </div>
                    <div className="qr-pay-price">
                        <p>
                            <span>Số tiền: </span>
                            {formatNumber(Number(orderData?.totalPrice))}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QrPaymen;
