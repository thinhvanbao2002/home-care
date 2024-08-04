import { Col, Form, Input, Row, Select, Upload, Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ModalForm from '~/components/common/components/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadFile, uploadFiles } from '~/services/instants/public-serbice';
import { fetchAllChildCategory } from '~/services/admin/admin-category-service';
import { createProduct } from '~/services/admin/admin-product-service';
import { openNotificationError, openNotificationSuccess } from '~/components/common/ultils';

function FormCreateProduct({ isModalCreateProductVisible, handleModalClose, getDataProduct }) {
    const [form] = Form.useForm();
    const [editorValue, setEditorValue] = useState('');
    const [fileList, setFileList] = useState([]);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState(0);
    const [warrantyPeriod, setWarrantyPeriod] = useState(36);
    const [categoryId, setCategoryId] = useState(null);
    const [weight, setWeigh] = useState(null);
    const [future, setFuture] = useState('');
    const [q, setQ] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productType, setProductType] = useState(null);
    const [productPhotos, setProductPhotos] = useState([]);

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            await createProduct(
                name,
                categoryId,
                price,
                warrantyPeriod,
                future,
                weight,
                productType,
                0,
                editorValue,
                imageUrl,
                productPhotos,
            );
            openNotificationSuccess('Thành công', 'Thêm sản phẩm thành công!');
            getDataProduct();
            handleModalClose();
            resetForm();
            return true;
        } catch (error) {
            openNotificationError('Thất bại', 'Thêm sản phẩm thất bại!');
            return false;
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const res = await fetchAllChildCategory(q, 1, 1000);
            setCategories(res.data);
        } catch (error) {}
    };

    const handleImageUpload = useCallback(
        async (info) => {
            const file = info.file.originFileObj;
            if (file) {
                try {
                    const response = await uploadFile(file);
                    setImageUrl(response.data.absoluteUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        [setImageUrl],
    );

    const resetForm = useCallback(() => {
        form.resetFields();
        setFileList([]); // Reset danh sách ảnh
    }, [form]);

    const handleUploadImages = async (fileList) => {
        const uploadedImageUrls = [];
        for (const file of fileList) {
            try {
                const response = await uploadFile(file.originFileObj);
                uploadedImageUrls.push(response.data.relativeUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        setProductPhotos(uploadedImageUrls);
    };

    const handleCloseModal = () => {
        return false;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Ảnh đại diện</div>
        </div>
    );

    return (
        <ModalForm
            visible={isModalCreateProductVisible}
            onClose={() => {
                handleModalClose();
                setImageUrl('');
                resetForm();
            }}
            onSubmit={handleSubmit}
            onReset={resetForm}
            width={1200}
            title="Thêm mới sản phẩm"
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                        <Form.Item
                            name="warranty_period"
                            value={warrantyPeriod}
                            onChange={(e) => setWarrantyPeriod(e.target.value)}
                            label="Thời gian bảo hành"
                            rules={[
                                { required: true, message: 'Vui lòng nhập thời gian bảo hành!' },
                                {
                                    pattern: /^[0-9]+(\.[0-9]+)?$/,
                                    message: 'Vui lòng nhập số hợp lệ!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập thời gian bảo hành" />
                        </Form.Item>
                        <Form.Item
                            name="weight"
                            value={weight}
                            onChange={(e) => setWeigh(e.target.value)}
                            label="Trọng lượng"
                            rules={[
                                { required: true, message: 'Vui lòng nhập trọng lượng sản phẩm!' },
                                {
                                    pattern: /^[0-9]+(\.[0-9]+)?$/,
                                    message: 'Vui lòng nhập số hợp lệ!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập trọng lượng" />
                        </Form.Item>
                        <Form.Item
                            name="future"
                            label="Tính năng"
                            rules={[{ required: true, message: 'Vui lòng nhập tính năng sản phẩm!' }]} // Không bắt buộc nhập
                            value={future}
                            onChange={(e) => setFuture(e.target.value)}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập tính năng sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            label="Giá tiền"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá tiền!',
                                },
                                {
                                    pattern: /^[0-9]+(\.[0-9]+)?$/,
                                    message: 'Vui lòng nhập số hợp lệ!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập giá tiền" />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Danh mục sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
                        >
                            <Select
                                placeholder="Chọn danh mục sản phẩm"
                                style={{ width: '100%' }}
                                showSearch
                                allowClear
                                onChange={(value) => setCategoryId(value)}
                                value={categoryId}
                                filterOption={(input, option) => {
                                    const children = String(option.children).toLowerCase();
                                    return children.includes(input.toLowerCase());
                                }}
                            >
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name} - {category.parent.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="product_type"
                            label="Loại sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
                        >
                            <Select
                                placeholder="Chọn loại sản phẩm"
                                style={{ width: '100%' }}
                                allowClear
                                onChange={(value) => setProductType(value)}
                                value={productType} // Đảm bảo giá trị đã chọn được hiển thị
                            >
                                <Select.Option value="new_product">Hàng mới về</Select.Option>
                                <Select.Option value="best_selling">Hàng bán chạy</Select.Option>
                                <Select.Option value="inventory">Hàng tồn kho</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="avatar"
                            label="Ảnh đại diện sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện sản phẩm!' }]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => true} // Ensure this returns true to allow upload
                                onChange={handleImageUpload}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{ width: '100%', height: '100%', borderRadius: '7px' }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="images"
                            label="Ảnh chi tiết sản phẩm"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e.fileList}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={({ fileList }) => {
                                    setFileList(fileList);
                                    handleUploadImages(fileList); // Upload multiple files
                                }}
                                multiple
                            >
                                <Button style={{ width: '100%', height: '100%' }} icon={<UploadOutlined />}>
                                    Chọn ảnh
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="description" label="Mô tả sản phẩm" rules={[{ required: false }]}>
                            <ReactQuill
                                value={editorValue}
                                onChange={setEditorValue}
                                placeholder="Nhập mô tả sản phẩm"
                                theme="snow"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </ModalForm>
    );
}

export default FormCreateProduct;
