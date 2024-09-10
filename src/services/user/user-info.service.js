import privateInstance from '../instants/axios-user-instant';
// Product
const updateInfo = ({ name, avatar }) => {
    return privateInstance.put('/customer', { name, avatar });
};

export { updateInfo };
