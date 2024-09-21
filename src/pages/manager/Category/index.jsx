import './category.css';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Input,
    Button,
    Modal,
    Form,
    Space,
    Row,
    Col,
    Select,
    DatePicker,
    Popconfirm,
    Tag,
    notification,
} from 'antd';
import { PlusOutlined, FileExcelFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    fetchAllCategory,
    createParentCategory,
    deleteCategory,
    createChildCategory,
    updateCategory,
} from '~/services/admin/admin-category-service';
import { openNotificationError } from '~/components/common/ultils';

const { RangePicker } = DatePicker;

// Notification configuration
const openNotification = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

const Category = () => {
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedParentKey, setSelectedParentKey] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [form] = Form.useForm();
    const [isParentCategoryModalVisible, setIsParentCategoryModalVisible] = useState(false);
    const [parentForm] = Form.useForm();
    const [parentCategory, setParentCategory] = useState('');
    const [parentId, setParentId] = useState();
    const [categoryId, setCategoryId] = useState();

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleAddParentCategory = async (values) => {
        try {
            await createParentCategory(values.name);
            openNotification('Thành công', 'Thêm mới danh mục thành công!');
            getAllCategory();
            setIsParentCategoryModalVisible(false);
            parentForm.resetFields();
        } catch (error) {}
    };

    const getAllCategory = async () => {
        try {
            const res = await fetchAllCategory();
            const payload = res.data.map((item, index) => {
                return {
                    key: index++,
                    index: index++,
                    name: item.name,
                    createdAt: moment(item.created_at).format('DD-MM-YYYY'),
                    status: item.status,
                    children: item.children.map((childItem, childIndex) => {
                        return {
                            key: `${index}-${childIndex++}`,
                            index: childIndex++,
                            name: childItem.name,
                            createdAt: moment(childItem.created_at).format('DD-MM-YYYY'),
                            parent_id: item.id,
                            id: childItem.id,
                            status: item.status,
                        };
                    }),
                    id: item.id,
                };
            });

            setDataSource(payload);
        } catch (error) {}
    };

    const showAddSubCategoryModal = (record) => {
        setParentId(record.id);
        setSelectedParentKey(record.key);
        setSelectedCategory(null);
        setIsModalVisible(true);
    };

    const showEditCategoryModal = (category) => {
        setCategoryId(category.id);
        setSelectedCategory(category);
        setIsModalVisible(true);
        form.setFieldsValue({ name: category.name, status: category.status });
    };

    const handleAddOrEditCategory = async (values) => {
        try {
            console.log('values', values);
            if (selectedCategory) {
                const newData = dataSource.map((item) => {
                    if (item.key === selectedCategory.key) {
                        return { ...item, name: values.name, status: true };
                    } else if (item.children) {
                        return {
                            ...item,
                            children: item.children.map((subItem) =>
                                subItem.key === selectedCategory.key
                                    ? { ...subItem, name: values.name, status: true }
                                    : subItem,
                            ),
                        };
                    }
                    return item;
                });
                await updateCategory(categoryId, values.name);
                openNotification('Thành công', 'Cập nhật danh mục thành công!');
                setDataSource(newData);
            } else {
                const newData = dataSource.map((item) => {
                    if (item.key === selectedParentKey) {
                        const newSubCategory = {
                            key: `${selectedParentKey}-${item.children.length + 1}`,
                            index: item.children.length + 1,
                            name: values.name,
                            createdAt: moment().format('DD-MM-YYYY'),
                            status: true,
                        };
                        return {
                            ...item,
                            children: [...item.children, newSubCategory],
                        };
                    }
                    return item;
                });
                await createChildCategory(parentId, values.name);
                openNotification('Thành công', 'Xóa danh mục thành công!');
                setDataSource(newData);
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async (record) => {
        try {
            await deleteCategory(record.id);
            openNotification('Thành công', 'Xóa danh mục thành công!');
            await getAllCategory();
        } catch (error) {
            console.log(error);
            // openNotificationError('Thất bại', error.response.data.message);
        }
    };

    const handleDeleteSubCategory = (parentKey, subKey) => {
        const newData = dataSource.map((item) => {
            if (item.key === parentKey) {
                return {
                    ...item,
                    children: item.children.filter((subItem) => subItem.key !== subKey),
                };
            }
            return item;
        });
        setDataSource(newData);
    };

    const handleRowClick = (record) => {
        console.log('Row clicked:', record);
        // Thực hiện các thao tác khác với dữ liệu của dòng được click
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Tag color={text === true ? 'blue' : 'red'}>{text === true ? 'Đang hoạt động' : 'Ngừng hoạt động'}</Tag>
            ),
        },
        {
            title: 'Hành động',
            width: 100,
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {record.children ? (
                        <>
                            <Button
                                type="link"
                                icon={<PlusOutlined />}
                                onClick={() => showAddSubCategoryModal(record)}
                            />
                            <Button type="link" icon={<EditOutlined />} onClick={() => showEditCategoryModal(record)} />
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa danh mục cha này không?"
                                onConfirm={() => handleDeleteCategory(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        </>
                    ) : (
                        <>
                            <Button type="link" icon={<EditOutlined />} onClick={() => showEditCategoryModal(record)} />
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa danh mục con này không?"
                                onConfirm={() => handleDeleteCategory(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        </>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Row gutter={16} align="middle" justify="space-between">
                <Col>
                    {/* <Row gutter={16}>
                        <Col>
                            <Input placeholder="Nội dung tìm kiếm" style={{ width: '200px' }} allowClear />
                        </Col>
                        <Col>
                            <Select placeholder="Trạng thái" style={{ width: '200px' }} allowClear>
                                <Select.Option value="active">Đang hoạt động</Select.Option>
                                <Select.Option value="inactive">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker placeholder={['Từ ngày', 'Đến ngày']} format="DD-MM-YYYY" />
                        </Col>
                    </Row> */}
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                onClick={() => setIsParentCategoryModalVisible(true)}
                                // onClick={() => setOpen(true)}
                            >
                                Thêm mới
                            </Button>
                        </Col>
                        {/* <Col>
                            <Button
                                type="button"
                                style={{ backgroundColor: '#009900', color: '#fff' }}
                                icon={<FileExcelFilled style={{ color: '#fff' }} />}
                            >
                                Xuất Excel
                            </Button>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            <Table
                style={{ marginTop: '40px' }}
                columns={columns}
                dataSource={dataSource}
                pagination={true}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Modal
                title={selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục con'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            form.validateFields()
                                .then((values) => {
                                    handleAddOrEditCategory(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                    >
                        {selectedCategory ? 'Lưu' : 'Thêm'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" name="add_subcategory_form">
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Thêm danh mục cha"
                visible={isParentCategoryModalVisible}
                onCancel={() => setIsParentCategoryModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsParentCategoryModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            parentForm
                                .validateFields()
                                .then((values) => {
                                    handleAddParentCategory(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                    >
                        Thêm
                    </Button>,
                ]}
            >
                <Form form={parentForm} layout="vertical" name="add_parentcategory_form">
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Category;
