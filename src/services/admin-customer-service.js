import privateAdminAxios from './axios-admin-instant';
// Product
const fetchAllCustomer = (q, status, fromDate, toDate, page, take) => {
    return privateAdminAxios.get('a/customer', {
        params: {
            q: q,
            status: status,
            from_date: fromDate,
            to_date: toDate,
            page: page,
            take: take,
        },
    });
};

const getDetailCustomer = (customerId) => {
    return privateAdminAxios.get(`a/customer/${customerId}`);
};

export { fetchAllCustomer, getDetailCustomer };
