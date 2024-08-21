import privateUserAxios from '../instants/axios-user-instant';

// Cart

const getAllCart = () => {
    return privateUserAxios.get(`cart`);
};

const addToCart = ({ productId }) => {
    return privateUserAxios.post(`cart`, {
        product_id: productId,
        product_number: 1,
    });
};

const updateCart = ({ cartId, newQuantity }) => {
    return privateUserAxios.put(`cart/${cartId}`, {
        product_number: parseInt(newQuantity),
    });
};

const deleteCart = ({ cartId }) => {
    return privateUserAxios.delete(`cart/${cartId}`);
};

export { addToCart, getAllCart, updateCart, deleteCart };
