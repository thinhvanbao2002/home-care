import { Col, Form, Input, Row, Select, Upload, Button, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ModalForm from '~/components/common/components/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadFile } from '~/services/instants/public-serbice';
import { fetchAllChildCategory } from '~/services/admin/admin-category-service';
import { deleteProductPhoto, updateProduct } from '~/services/admin/admin-product-service';
import { openNotificationSuccess } from '~/components/common/ultils';

function FormUpdateProduct({ isModalUpdateProductVisible, handleModalClose, data, getDataProduct }) {
    const [form] = Form.useForm();
    const [editorValue, setEditorValue] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [warrantyPeriod, setWarrantyPeriod] = useState(36);
    const [categoryId, setCategoryId] = useState(null);
    const [weight, setWeigh] = useState(null);
    const [future, setFuture] = useState('');
    const [productType, setProductType] = useState(null);
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        if (data) {
            setProductId(data?.id);
            setName(data?.name);
            setPrice(data?.price);
            setWarrantyPeriod(data?.warranty_period);
            setWeigh(data?.weight);
            setFuture(data?.future);
            setProductType(data?.product_type);
            setImageUrl(data?.image);
            setEditorValue(data?.description);
            setCategoryId(data?.category_id);
            form.setFieldsValue({
                name: data?.name,
                price: data?.price,
                warranty_period: data?.warranty_period,
                weight: data?.weight,
                future: data?.feature,
                category: data?.category_id,
                product_type: data?.product_type,
                avatar: data?.image,
                description: data?.description,
            });

            setEditorValue(data.description || '');

            setImageUrl(data.image || '');
        }
    }, [data, form]);

    useEffect(() => {
        const transformedFileList = data?.product_photo?.map((url, index) => ({
            uid: `${index}`, // unique identifier
            name: `image_${index + 1}`, // name of the file
            status: 'done', // status of the upload (done, uploading, error, etc.)
            url: url.url, // URL of the image
            id: url?.id, // ID của ảnh trong cơ sở dữ liệu
        }));

        console.log('transformedFileList', transformedFileList);

        setFileList(transformedFileList);
        console.log(fileList, 'file');
    }, [data]);

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const res = await fetchAllChildCategory();
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
                    form.setFieldsValue({ avatar: response.data.relativeUrl });
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        },
        [form],
    );

    const resetForm = useCallback(() => {
        form.resetFields();
        setFileList([]);
        setImageUrl(null);
        setEditorValue('');
    }, [form]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file.originFileObj);
            });
        }
        const img = document.createElement('img');
        img.src = file.preview || file.url;
        const modal = Modal.info({
            title: 'Xem trước ảnh',
            content: <img src={img.src} alt="Preview" style={{ width: '100%', height: 'auto' }} />,
            width: 800,
            onOk() {
                modal.destroy();
            },
        });
    };

    const handleRemove = async (file) => {
        try {
            await deleteProductPhoto(file?.id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            // await updateVoucher(data?.id, name, endTime, discountPercent);
            // await getDataVoucher();
            await updateProduct({
                name,
                categoryId,
                price,
                warrantyPeriod,
                feature: future,
                weight,
                productType,
                description: editorValue,
                image: imageUrl,
                productId,
            });
            openNotificationSuccess('Thành công', 'Cập nhật sản phẩm thành công!');
            getDataProduct();
            handleModalClose();
        } catch (error) {
            console.log(error);
        }
    };

    // Cập nhật fileList ngay lập tức
    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };
    return (
        <ModalForm
            onSubmit={handleSubmit}
            visible={isModalUpdateProductVisible}
            onClose={() => {
                handleModalClose();
                resetForm();
            }}
            width={1200}
            title="Cập nhật sản phẩm"
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                        <Form.Item
                            value={warrantyPeriod}
                            onChange={(e) => setWarrantyPeriod(e.target.value)}
                            name="warranty_period"
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
                            value={weight}
                            onChange={(e) => setWeigh(e.target.value)}
                            name="weight"
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
                            value={future}
                            onChange={(e) => setFuture(e.target.value)}
                            name="future"
                            label="Tính năng"
                            rules={[{ required: true, message: 'Vui lòng nhập tính năng sản phẩm!' }]}
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
                                onChange={(value) => {
                                    form.setFieldsValue({ category: value });
                                    console.log(value);

                                    setCategoryId(value);
                                }}
                                value={form.getFieldValue('category')}
                                filterOption={(input, option) => {
                                    const children = String(option.children).toLowerCase();
                                    return children.includes(input.toLowerCase());
                                }}
                            >
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category?.name} - {category?.parent?.name}
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
                                onChange={(value) => {
                                    form.setFieldsValue({ product_type: value });
                                    setProductType(value);
                                }}
                                value={form.getFieldValue('product_type')}
                            >
                                <Select.Option value="new_product">Hàng mới về</Select.Option>
                                <Select.Option value="best_selling">Hàng bán chạy</Select.Option>
                                <Select.Option value="inventory">Hàng tồn kho</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="avatar"
                            value={imageUrl}
                            label="Ảnh đại diện sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh đại diện sản phẩm!' }]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => true}
                                onChange={handleImageUpload}
                                onPreview={handlePreview}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{ width: '100%', height: '100%', borderRadius: '7px' }}
                                    />
                                ) : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Ảnh đại diện</div>
                                    </div>
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
                            getValueFromEvent={(e) => e && e.fileList}
                        >
                            <p>
                                {fileList?.map((item) => (
                                    <h1></h1>
                                ))}
                            </p>
                            <Upload
                                onRemove={handleRemove}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleFileChange}
                                onPreview={handlePreview}
                                defaultFileList={fileList}
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
                        <Form.Item name="description" label="Mô tả sản phẩm">
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

export default FormUpdateProduct;
