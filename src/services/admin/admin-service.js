import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllAdmin = (q, status, fromDate, toDate, page, take) => {
    return privateAdminAxios.get('/admin', {
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

const createAdmin = (name, phone, email, password, avatar, role, last_login) => {
    return privateAdminAxios.post('/user', {
        name,
        phone,
        email,
        password,
        avatar,
        role,
        last_login,
    });
};

const deleteAdmin = (adminId) => {
    return privateAdminAxios.delete(`/admin/${adminId}`);
};

const updateAdmin = (adminId, name, avatar, status) => {
    return privateAdminAxios.put(`/admin/${adminId}`, {
        name: name,
        avatar: avatar,
        status: status,
    });
};

const getDetailAdmin = (adminId) => {
    return privateAdminAxios.get(`/admin/${adminId}`);
};

export { fetchAllAdmin, createAdmin, deleteAdmin, getDetailAdmin, updateAdmin };
