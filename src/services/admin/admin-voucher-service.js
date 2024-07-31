import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllVoucher = (q, status, fromDate, toDate, page, take) => {
    return privateAdminAxios.get('a/voucher', {
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

const createVoucher = (name, endTime, discountPercent) => {
    return privateAdminAxios.post('a/voucher', {
        name,
        end_time: endTime,
        discount_percent: discountPercent,
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

export { fetchAllVoucher, createVoucher, getDetailVoucher, updateVoucher, deleteVoucher };
