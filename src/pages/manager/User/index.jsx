import React, { useEffect, useState } from 'react';
import { Button, Table, DatePicker, Input, Select, Row, Col, Tag, Form, Upload } from 'antd';
import '../Admin/admin.css';
import { EditOutlined, DeleteOutlined, FileExcelFilled, PlusOutlined } from '@ant-design/icons';
import { fetchAllCustomer, getDetailCustomer } from '~/services/admin-customer-service';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import moment from 'moment';
import { formatNumber } from '~/components/common/ultils';
import UserDetailModal from '~/components/common/Modal';
import ModalForm from '~/components/common/Modal';
import { FormUserDetail } from './components/FormUserDetail';

const { RangePicker } = DatePicker;

function User() {
    const [componentSize, setComponentSize] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);
    const [changeSelectValue, setChangeSelectValue] = useState(null);
    const [total, setTotal] = useState(0);

    const [user, setDataUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [userDetail, setUserDetail] = useState([]);
    // Xử lý date
    const handleDateChange = (dates) => {
        setDateRange(dates);
        if (dates) {
            const formattedDates = dates.map((date) => (date ? date.format('DD-MM-YYYY') : null));
            setFromDate(formattedDates[0]);
            setToDate(formattedDates[1]);
        }
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const handleClick = (record) => {
        console.log('Click', record);
    };

    // Fetch All user admin
    useEffect(() => {
        getCustomerAdmin();
    }, []);

    // get list product
    const getCustomerAdmin = async () => {
        try {
            let res = await fetchAllCustomer(searchKeyword, changeSelectValue, fromDate, toDate, page, take);
            setDataUser(res.data);

            setTotal(res.meta.item_count);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeSelect = (value) => {
        setChangeSelectValue(value);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleOpenDetailCustomer = async (customerId) => {
        try {
            setIsModalVisible(!isModalVisible);
            const res = await getDetailCustomer(customerId);
            setUserDetail(res?.data);
            setSelectedUser(customerId);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(userDetail);

    const columns = [
        {
            title: 'STT',
            width: 80,
            dataIndex: 'key',
            key: '0',
            fixed: 'left',
        },

        { title: 'Tên', dataIndex: 'name', key: '1', width: 200 },
        { title: 'Số điện thoại', dataIndex: 'phone', key: '2', width: 150 },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '3',
            width: 150,
            render: (text) => <Tag color={text === 'Đang hoạt động' ? 'blue' : 'red'}>{text}</Tag>,
        },
        { title: 'Ngày đăng nhập gần nhất', dataIndex: 'last_login', key: '5', width: 200 },
        { title: 'Ngày sinh', dataIndex: 'birth_day', key: '6', width: 200 },
        { title: 'Số dư ví', dataIndex: 'wallet', key: '7', width: 200 },
        { title: 'Điểm tích lũy', dataIndex: 'cumulative_score', key: '8', width: 200 },
        { title: 'Ngày tạo', dataIndex: 'created_at', key: '9', width: 150 },
        { title: 'id', dataIndex: 'id', key: '10', width: 100 },
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
                        onClick={() => handleOpenDetailCustomer(record?.id)}
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
                                <Select.Option value="Đang hạt động">Đang hạt động</Select.Option>
                                <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <RangePicker
                                placeholder={['Từ ngày', 'Đến ngày']}
                                onChange={handleDateChange}
                                value={dateRange}
                                format="DD-MM-YYYY"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={16}>
                        {/* <Col>
                            <Button type="primary" style={{ marginRight: 16 }} icon={<PlusOutlined />}>
                                Thêm mới
                            </Button>
                        </Col> */}
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
                dataSource={user?.map((data, index) => {
                    const realIndex = (page - 1) * take + index + 1;
                    return {
                        key: realIndex,
                        name: data.name,
                        phone: data.phone,
                        status: data.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động',
                        last_login: data.last_login
                            ? moment(data.last_login, 'YYYY-MM-DD').format('DD/MM/YYYY')
                            : 'Chưa đăng nhập',
                        birth_day: moment(data.birth_day, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        wallet: formatNumber(data.customer.customer_wallet.balance),
                        cumulative_score: formatNumber(data.customer.cumulative_score),
                        created_at: moment(data.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                        id: data.id,
                    };
                })}
                scroll={{ x: 1300 }}
                onRow={(record) => ({
                    onClick: () => handleClick(record),
                })}
                pagination={{
                    current: page,
                    pageSize: take,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            <ModalForm
                visible={isModalVisible}
                onClose={handleModalClose}
                children={<FormUserDetail data={userDetail} />}
            />
        </>
    );
}

export default User;
