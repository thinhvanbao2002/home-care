import publicInstance from '../instants/axios-public-instant';
// Product
const fetchAllProduct = ({ q, categoryId, status, product_type, page, take }) => {
    return publicInstance.get('product', {
        params: {
            q: q,
            brand: categoryId,
            status: status,
            page: page,
            take: take,
        },
    });
};

const fetchBestSeller = () => {
    return publicInstance.get('product/best-seller');
};

const getDetailProduct = (productId) => {
    return publicInstance.get(`a/product/${productId}`);
};

export { fetchAllProduct, getDetailProduct, fetchBestSeller };
