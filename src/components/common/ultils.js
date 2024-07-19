import { notification } from 'antd';
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
