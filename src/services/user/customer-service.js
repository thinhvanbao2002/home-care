import publicInstance from '../instants/axios-public-instant';
// Product
const register = (name, phone, email, password, birth_day, address) => {
    return publicInstance.post('/customer', { name, phone, email, password, birth_day, address });
};

export { register };
