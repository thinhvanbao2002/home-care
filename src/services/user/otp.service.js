import publicInstance from '../instants/axios-public-instant';
import privateInstance from '../instants/axios-user-instant';
// Product
const sendOtp = ({ phone }) => {
    return publicInstance.post('/otp/send', { phone_number: phone });
};

const verifyOtp = ({ phone, otp }) => {
    return privateInstance.post('/otp/verify', {
        phone_number: phone,
        otp_code: otp,
    });
};

export { sendOtp, verifyOtp };
