import publicInstance from './axios-admin-instant';

// Upload file
const uploadFile = (image) => {
    const formData = new FormData();
    formData.append('image', image);

    return publicInstance.post('/uploads/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
export { uploadFile };
