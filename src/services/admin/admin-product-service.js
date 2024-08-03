import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllProduct = (q, status, fromDate, toDate, page, take, brand, product_type) => {
    return privateAdminAxios.get('a/product', {
        params: {
            q: q,
            category_id: brand,
            status: status,
            from_date: fromDate,
            to_date: toDate,
            product_type: product_type,
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

const getDetailVoucher = (voucherId) => {
    return privateAdminAxios.get(`a/voucher/${voucherId}`);
};

const updateVoucher = (voucherId, name, enTime, discountPercent) => {
    return privateAdminAxios.put(`a/voucher/${voucherId}`, {
        name,
        end_time: enTime,
        discount_percent: discountPercent,
    });
};

const deleteVoucher = (voucherId) => {
    return privateAdminAxios.delete(`a/voucher/${voucherId}`);
};

export { fetchAllProduct, createProduct, getDetailVoucher, updateVoucher, deleteVoucher };
