import publicInstance from '../instants/axios-public-instant';
// Product
const fetchAllCategory = () => {
    return publicInstance.get('category', {
        // params: {
        //     q: q,
        //     brand: categoryId,
        //     status: status,
        //     from_date: fromDate,
        //     to_date: toDate,
        //     product_type: productType,
        //     page: page,
        //     take: take,
        // },
    });
};

const fetchAllChildCategory = () => {
    return publicInstance.get('category/child');
};

// const getDetailProduct = (productId) => {
//     return publicInstance.get(`a/product/${productId}`);
// };

export { fetchAllCategory, fetchAllChildCategory };
