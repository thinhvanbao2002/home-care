import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const getNumberCustomer = () => {
    return privateAdminAxios.get('a/customer');
};

const getNumberProduct = () => {
    return privateAdminAxios.get('a/product');
};

const getNumberOrder = () => {
    return privateAdminAxios.get('a/order');
};
const getDetailCustomer = (customerId) => {
    return privateAdminAxios.get(`a/customer/${customerId}`);
};

const updateCustomer = (customerId, name, avatar, status) => {
    return privateAdminAxios.put(`a/customer/${customerId}`, {
        name: name,
        avatar: avatar,
        status: status,
    });
};

const deleteCustomer = (customerId) => {
    return privateAdminAxios.delete(`a/customer/${customerId}`);
};

export { getNumberCustomer, getNumberProduct, getNumberOrder };
