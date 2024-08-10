import axios from 'axios';

const publicInstance = axios.create({
    baseURL: process.env.BASE_API_URL || 'http://localhost:3009/api/v1',
});

console.log('ENV:', process.env.BASE_API_URL);

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
