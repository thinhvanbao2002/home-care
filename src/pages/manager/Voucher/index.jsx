import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Input, Select, Row, Col, Tag, Modal } from 'antd';
import '../Admin/admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled } from '@ant-design/icons';
import { deleteCustomer, fetchAllCustomer, getDetailCustomer } from '~/services/admin/admin-customer-service';
import moment from 'moment';
import { formatNumber, openNotificationError, openNotificationSuccess } from '~/components/common/ultils';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteVoucher, fetchAllVoucher, getDetailVoucher } from '~/services/admin/admin-voucher-service';
import { FormVoucherDetail } from './components/FormVoucherDetail';
import { FormCreateVoucher } from './components/FormCreateVoucher';
const { RangePicker } = DatePicker;

function Voucher() {
    const [vouchers, setVouchers] = useState([]);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [total, setTotal] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [voucher, setVoucher] = useState({});
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isModalCreateVoucherVisible, setIsModalCreateVoucherVisible] = useState(false);
    const [voucherDetail, setVoucherDetail] = useState({});
    const [voucherId, setVoucherId] = useState(null);

    useEffect(() => {
        getAllVoucher();
    }, []);

    const getAllVoucher = async () => {
        try {
            const res = await fetchAllVoucher();
            setVouchers(res.data);
        } catch (error) {}
    };

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setTake(pagination.pageSize);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setIsModalCreateVoucherVisible(false);
    };

    const handleOpenDetailVoucher = async (voucherId) => {
        try {
            setIsModalVisible(!isModalVisible);
            const res = await getDetailVoucher(voucherId);
            setVoucherDetail(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteVoucher = async () => {
        try {
            await deleteVoucher(voucherId);
            openNotificationSuccess('Thành công', 'Xóa mã giảm giá thành công!');
            await getAllVoucher();
            setDeleteModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: 'STT',
            width: 80,
            dataIndex: 'key',
            key: '0',
            fixed: 'left',
        },

        { title: 'Tiêu đề', dataIndex: 'name', key: '1', width: 200 },

        { title: 'Ngày tạo', dataIndex: 'created_at', key: '2', width: 200 },
        { title: 'Ngày hết hạn', dataIndex: 'end_time', key: '3', width: 200 },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '4',
            width: 150,
            render: (text) => <Tag color={text === 'Đang hoạt động' ? 'blue' : 'red'}>{text}</Tag>,
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text, record) => (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        type="button"
                        icon={<EditOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            marginRight: 20,
                            backgroundColor: '#FFCC33',
                        }}
                        size="large"
                        onClick={() => handleOpenDetailVoucher(record?.id)}
                    ></Button>
                    <Button
                        type="button"
                        icon={<DeleteOutlined style={{ color: '#fff' }} />}
                        style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            backgroundColor: '#FF3333',
                        }}
                        size="large"
                        onClick={() => {
                            setDeleteModalVisible(true);
                            setVoucherId(record?.id);
                        }}
                    ></Button>
                </span>
            ),
        },
    ];
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
                                <Select.Option value="Đang hạt động">Đang hoạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
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
                </Col>
                <Col>
                    <Row gutter={16}>
                        <Col>
                            <Button
                                type="primary"
                                style={{ marginRight: 16 }}
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalCreateVoucherVisible(true)}
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
                </Col>
            </Row>
            <Table
                style={{ marginTop: 40 }}
                columns={columns}
                dataSource={vouchers?.map((data, index) => {
                    const realIndex = (page - 1) * take + index + 1;
                    return {
                        key: realIndex,
                        name: data.name,
                        created_at: moment(data.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        end_time: moment(data.end_time, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        id: data.id,
                        status: data.status === true ? 'Đang hoạt động' : 'Ngừng hoạt động',
                    };
                })}
                scroll={{ x: 1300 }}
                onChange={handleTableChange}
                pagination={{
                    current: page,
                    pageSize: take,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            <FormVoucherDetail
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                data={voucherDetail}
                getDataVoucher={getAllVoucher}
            />
            <FormCreateVoucher
                isModalCreateVoucherVisible={isModalCreateVoucherVisible}
                handleModalClose={handleModalClose}
                getDataVoucher={getAllVoucher}
            />
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ExclamationCircleOutlined
                            style={{ color: '#FF3333', fontSize: '24px', marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '20px' }}>Xác nhận xóa</span>
                    </div>
                }
                visible={deleteModalVisible}
                onOk={handleDeleteVoucher} // Define this function to handle delete action
                onCancel={() => setDeleteModalVisible(false)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                centered // Center the modal vertically
            >
                <p style={{ fontSize: '18px', textAlign: 'center' }}>Bạn có chắc chắn muốn xóa?</p>
            </Modal>
        </>
    );
}

export default Voucher;
