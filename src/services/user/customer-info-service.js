import privateUserAxios from '../instants/axios-user-instant';

const createAddress = ({ name, phone, address }) => {
    return privateUserAxios.post('/customer-info', {
        name: name,
        phone: phone,
        address: address,
        is_default: true,
    });
};

const updateAddress = ({ name, phone, address, isDefault, addressId }) => {
    return privateUserAxios.put(`/customer-info/${addressId}`, {
        name: name,
        phone: phone,
        address: address,
        is_default: isDefault,
    });
};

const fetchAllAdress = () => {
    return privateUserAxios.get('/customer-info');
};

const deleteAddress = ({ id }) => {
    return privateUserAxios.delete(`/customer-info/${id}`);
};

export { createAddress, fetchAllAdress, updateAddress, deleteAddress };
