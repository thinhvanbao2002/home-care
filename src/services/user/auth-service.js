import publicInstance from '../instants/axios-public-instant';
import privateInstance from '../instants/axios-user-instant';
// Product
const login = (email, password) => {
    return publicInstance.post('/auth/login', { email, password });
};

const changePassword = ({ oldPassword, newPassword, rePassword }) => {
    return privateInstance.post('/auth/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
        re_enter_password: rePassword,
    });
};

export { login, changePassword };
