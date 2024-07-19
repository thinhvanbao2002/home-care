import axios from 'axios';
import env from 'react-dotenv';

const publicInstance = axios.create({
    baseURL: 'http://localhost:3009/api/v1/',
});

// Add a response interceptor
publicInstance.interceptors.response.use(
    function (response) {
        // Xử lý phản hồi thành công
        return response.data;
    },
    function (error) {
        // Xử lý lỗi phản hồi
        return Promise.reject(error);
    },
);

export default publicInstance;
