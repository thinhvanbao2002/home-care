import privateUserAxios from '../instants/axios-user-instant';

const createAddress = ({ name, phone, address }) => {
    return privateUserAxios.post('/customer-info', {
        name: name,
        phone: phone,
        address: address,
        is_default: true,
    });
};

const fetchAllAdress = () => {
    return privateUserAxios.get('/customer-info');
};

export { createAddress, fetchAllAdress };
