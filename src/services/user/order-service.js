import privateUserAxios from '../instants/axios-user-instant';

// Cart

const createOrder = ({ name, phone, address, note, customerId, totalPrice, items }) => {
    return privateUserAxios.post(`order`, {
        name,
        phone,
        address,
        note,
        customer_id: customerId,
        total_price: totalPrice,
        items,
    });
};

const getAllOrder = () => {
    return privateUserAxios.get(`order`);
};

export { createOrder, getAllOrder };
