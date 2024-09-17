import axios from 'axios';
import { API_BASE_URL } from './types/instant';

const publicInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
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
