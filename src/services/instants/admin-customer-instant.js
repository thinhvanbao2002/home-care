import axios from 'axios';
import { API_BASE_URL } from './types/instant';

const customer_instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});
console.log('ENV:', process.env.REACT_APP_API_BASE_URL);

// Add a request interceptor
customer_instance.interceptors.request.use(
    function (config) {
        // Thêm token vào header nếu có
        const token = localStorage.getItem('customer-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Xử lý lỗi yêu cầu
        return Promise.reject(error);
    },
);

// Add a response interceptor
customer_instance.interceptors.response.use(
    function (response) {
        // Xử lý phản hồi thành công
        return response.data;
    },
    function (error) {
        // Xử lý lỗi phản hồi
        return Promise.reject(error);
    },
);

export default customer_instance;
