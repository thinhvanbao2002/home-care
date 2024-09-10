import publicInstance from '../instants/axios-public-instant';
import privateInstance from '../instants/axios-user-instant';
// Product
const fetchAllProductReview = ({ productId }) => {
    return publicInstance.get(`product-review/${productId}`);
};

const reviewProduct = ({ productId, review }) => {
    return privateInstance.post(`product-review`, {
        product_id: productId,
        review,
    });
};

export { fetchAllProductReview, reviewProduct };
