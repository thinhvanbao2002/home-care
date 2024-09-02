import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllOrder = ({ status, fromDate, toDate, page, take }) => {
    return privateAdminAxios.get('a/order', {
        params: {
            order_status: status,
            from_date: fromDate,
            to_date: toDate,
            page: page,
            take: take,
        },
    });
};

const updateProduct = ({
    name,
    categoryId,
    price,
    warrantyPeriod,
    feature,
    weight,
    productType,
    quantity,
    description,
    image,
    productPhoto,
    productId,
}) => {
    return privateAdminAxios.put(`a/product/${productId}`, {
        name,
        category_id: categoryId,
        price,
        warranty_period: warrantyPeriod,
        feature,
        weight,
        product_type: productType,
        quantity,
        description,
        image,
        product_photo: productPhoto,
    });
};

const getDetailOrder = (orderId) => {
    return privateAdminAxios.get(`a/order/${orderId}`);
};

const updateVoucher = (voucherId, name, enTime, discountPercent) => {
    return privateAdminAxios.put(`a/voucher/${voucherId}`, {
        name,
        end_time: enTime,
        discount_percent: discountPercent,
    });
};

const deleteProduct = (productId) => {
    return privateAdminAxios.delete(`a/product/${productId}`);
};

const deleteProductPhoto = (productId) => {
    return privateAdminAxios.delete(`product-photo/${productId}`);
};

export { fetchAllOrder, getDetailOrder };
