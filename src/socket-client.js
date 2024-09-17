// socket-client.js
import { io } from 'socket.io-client';
import { API_BASE_URL } from './services/instants/types/instant';

// Tạo kết nối đến server WebSocket và gửi token
const socket = io(API_BASE_URL.URL_LOCAL, {
    auth: {
        token: localStorage.getItem('user-token'), // Lấy JWT token từ localStorage hoặc nơi khác
    },
});

// Bắt sự kiện khi kết nối thành công
socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

// Bắt sự kiện khi mất kết nối
socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

// Bạn có thể gửi dữ liệu hoặc nhận các sự kiện khác tại đây
socket.on('notification', (data) => {
    console.log('Received notification:', data);
});

export default socket;
