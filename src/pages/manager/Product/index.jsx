import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Input, Select, Row, Col, Tag, Modal } from 'antd';
import '../Admin/admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled } from '@ant-design/icons';
import { deleteCustomer, fetchAllCustomer, getDetailCustomer } from '~/services/admin/admin-customer-service';
import moment from 'moment';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteVoucher, fetchAllVoucher, getDetailVoucher } from '~/services/admin/admin-voucher-service';
const { RangePicker } = DatePicker;

function Product() {
    // Xử lý date
    const handleDateChange = (dates) => {
        // setDateRange(dates);
        // if (dates) {
        //     const formattedDates = dates.map((date) => (date ? date.format('DD-MM-YYYY') : null));
        //     setFromDate(formattedDates[0]);
        //     setToDate(formattedDates[1]);
        // }
    };

    return (
        <>
            <Row gutter={16} align="middle" justify="space-between">
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Input placeholder="Nội dung tìn kiếm" style={{ width: '200px' }} allowClear />
                        </Col>
                        <Col>
                            <Select placeholder="Trạng thái" style={{ width: '200px' }} allowClear>
                                <Select.Option value="Đang hạt động">Đang hạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                onChange={handleDateChange}
                                // value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        <Col>
                            <Select placeholder="Loại sản phẩm" style={{ width: '200px' }} allowClear>
                                <Select.Option value="Đang hạt động">Đang hạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Thương hiệu" style={{ width: '200px' }} allowClear>
                                <Select.Option value="samsung">Samsung</Select.Option>
                                <Select.Option value="tosiba">Tosiba</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Loại hàng" style={{ width: '300px' }} allowClear>
                                <Select.Option value="samsung">Sản phẩm mới</Select.Option>
                                <Select.Option value="tosiba">Sản phẩm bán chạy</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                // onClick={() => setOpen(true)}
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

export default Product;
