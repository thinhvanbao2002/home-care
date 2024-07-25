import privateAdminAxios from '../instants/axios-admin-instant';
// Product
const fetchAllCategory = (q, status, fromDate, toDate, page, take) => {
    return privateAdminAxios.get('a/category', {
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

const createChildCategory = (parentId, name) => {
    return privateAdminAxios.post('a/category/child', {
        parent_id: parentId,
        name: name,
    });
};

const createParentCategory = (name) => {
    return privateAdminAxios.post('a/category', {
        name,
    });
};

const updateCategory = (categoryId, name) => {
    return privateAdminAxios.patch(`a/category/${categoryId}`, {
        name,
    });
};

const deleteCategory = (categoryId) => {
    return privateAdminAxios.delete(`a/category/${categoryId}`);
};

export { fetchAllCategory, createParentCategory, deleteCategory, createChildCategory, updateCategory };
