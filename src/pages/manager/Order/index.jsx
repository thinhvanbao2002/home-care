import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, FileExcelFilled } from '@ant-design/icons';
const { RangePicker } = DatePicker;

function AdminOrder() {
    return (
        <>
            <Row gutter={16} align="middle" justify="space-between">
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Input
                                placeholder="Nội dung tìn kiếm"
                                style={{ width: '200px' }}
                                // onChange={(e) => setQ(e.target.value)}
                                allowClear
                            />
                        </Col>
                        <Col>
                            <Select
                                // value={status}
                                // onChange={(value) => setStatus(value)}
                                placeholder="Trạng thái"
                                style={{ width: '200px' }}
                                allowClear
                            >
                                <Select.Option value="true">Đang hạt động</Select.Option>
                                <Select.Option value="false">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                // onChange={handleDateChange}
                                // value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col>
                            <Select
                                placeholder="Chọn loại sản phẩm"
                                style={{ width: '200px' }}
                                allowClear
                                // onChange={(value) => setProductType(value)}
                                // value={productType} // Đảm bảo giá trị đã chọn được hiển thị
                            >
                                <Select.Option value="new_product">Hàng mới về</Select.Option>
                                <Select.Option value="best_selling">Hàng bán chạy</Select.Option>
                                <Select.Option value="inventory">Hàng tồn kho</Select.Option>
                            </Select>
                        </Col>

                        {/* <Col>
                            <Select placeholder="Loại hàng" style={{ width: '300px' }} allowClear>
                                <Select.Option value="samsung">Sản phẩm mới</Select.Option>
                                <Select.Option value="tosiba">Sản phẩm bán chạy</Select.Option>
                            </Select>
                        </Col> */}
                    </Row>
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                // onClick={() => setIsModalCreateProductVisible(true)}
                            >
                                Thêm mới
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="button"
                                style={{ backgroundColor: '#009900', color: '#fff' }}
                                icon={<FileExcelFilled style={{ color: '#fff' }} />}
                            >
                                Xuất Excel
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div style={{ height: '53px' }}></div>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default AdminOrder;
