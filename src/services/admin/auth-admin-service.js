import publicInstance from '../instants/axios-public-instant';
// Product
const loginAdmin = (email, password) => {
    return publicInstance.post('/auth/login', { email, password });
};

export { loginAdmin };
