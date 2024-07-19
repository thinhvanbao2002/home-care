import publicInstance from '../instants/axios-public-instant';
// Product
const login = (email, password) => {
    return publicInstance.post('/auth/login', { email, password });
};

export { login };
