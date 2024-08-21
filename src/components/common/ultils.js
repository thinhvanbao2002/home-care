import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

export function formatNumber(number) {
    return number.toLocaleString('en-US');
}

export const openNotificationSuccess = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

export const openNotificationError = (message, description) => {
    notification.error({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

export const removeVietnameseAccents = (str) => {
    const map = {
        à: 'a',
        á: 'a',
        ả: 'a',
        ã: 'a',
        ạ: 'a',
        è: 'e',
        é: 'e',
        ẻ: 'e',
        ẽ: 'e',
        ẹ: 'e',
        ì: 'i',
        í: 'i',
        ỉ: 'i',
        ĩ: 'i',
        ị: 'i',
        ò: 'o',
        ó: 'o',
        ỏ: 'o',
        õ: 'o',
        ọ: 'o',
        ù: 'u',
        ú: 'u',
        ủ: 'u',
        ũ: 'u',
        ụ: 'u',
        ỳ: 'y',
        ý: 'y',
        ỷ: 'y',
        ỹ: 'y',
        ỵ: 'y',
        // Add more mappings as needed
        đ: 'd',
        Đ: 'd',
    };
    return str
        .split('')
        .map((char) => map[char] || char)
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '');
};
