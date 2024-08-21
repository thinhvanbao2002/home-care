import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllProduct = ({ q, status, fromDate, toDate, page, take, categoryId, productType }) => {
    return privateAdminAxios.get('a/product', {
        params: {
            q: q,
            brand: categoryId,
            status: status,
            from_date: fromDate,
            to_date: toDate,
            product_type: productType,
            page: page,
            take: take,
        },
    });
};

const createProduct = (
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
) => {
    return privateAdminAxios.post('a/product', {
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

const getDetailProduct = (productId) => {
    return privateAdminAxios.get(`a/product/${productId}`);
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

export {
    fetchAllProduct,
    createProduct,
    getDetailProduct,
    updateVoucher,
    deleteProduct,
    deleteProductPhoto,
    updateProduct,
};
