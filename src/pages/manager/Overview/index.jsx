import './overview.css';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getDataByYear, getNumberCustomer, getNumberOrder, getNumberProduct } from '~/services/admin/overview.service';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Overview() {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (từ 1 đến 12)
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));
    const [countCustomer, setCountCustomer] = useState(0);
    const [countProduct, setCountProduct] = useState(0);
    const [countOrder, setCountOrder] = useState(0);
    const [dailyRevenueData, setDailyRevenueData] = useState([]); // State for daily revenue
    const [dailyRevenueDataYear, setDailyRevenueDataYear] = useState([]); // State for daily revenue

    const dataByYear = {
        2022: [100, 130, 150, 170, 160, 200, 180, 210, 190, 220, 230, 240],
        2023: [110, 140, 160, 180, 150, 210, 190, 220, 200, 230, 240, 250],
        2024: [120, 150, 180, 200, 170, 220, 190, 230, 210, 240, 250, 260],
    };

    const numberCustomer = async () => {
        try {
            const res = await getNumberCustomer();
            setCountCustomer(res.meta.item_count);
        } catch (error) {}
    };

    const getAllProducts = async () => {
        try {
            const res = await getNumberProduct();
            setCountProduct(res.meta.item_count);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllOrder = async () => {
        try {
            const res = await getNumberOrder();
            setCountOrder(res.meta.item_count);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRevenueByDay = async (year, month) => {
        try {
            const response = await fetch(
                `http://localhost:3009/api/v1/overview/month/revenue?year=${selectedYear}&&month=${selectedMonth}`,
            );
            const data = await response.json();

            if (data.status && data.code === 200) {
                return data.data.dailyRevenue; // Trả về mảng doanh thu hàng ngày
            }
        } catch (error) {
            console.error('Failed to fetch daily revenue data:', error);
        }
        return [];
    };

    const fetchMonthlyRevenue = async (year) => {
        try {
            const res = await getDataByYear({ year });

            return res.data.monthlyRevenue;
        } catch (error) {
            console.error('Failed to fetch monthly revenue data:', error);
        }
        return [];
    };

    useEffect(() => {
        const loadMonthlyRevenue = async () => {
            const monthlyRevenue = await fetchMonthlyRevenue(selectedYear);

            console.log(monthlyRevenue);

            setDailyRevenueDataYear(monthlyRevenue);
        };

        loadMonthlyRevenue();
    }, [selectedYear]);

    useEffect(() => {
        numberCustomer();
        getAllProducts();
        getAllOrder();
    }, []);

    useEffect(() => {
        const loadDailyRevenue = async () => {
            const [year, month] = selectedMonth.split('-');
            const dailyRevenue = await fetchRevenueByDay(selectedYear, selectedMonth);
            setDailyRevenueData(dailyRevenue);
        };

        loadDailyRevenue();
    }, [selectedMonth, selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const data = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: `Doanh thu (triệu đồng) - ${selectedYear}`,
                data: dailyRevenueDataYear,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Thống kê doanh thu hàng tháng - ${selectedYear}`,
            },
        },
    };

    const dataDaily = {
        labels: Array.from({ length: dailyRevenueData.length }, (_, i) => `Ngày ${i + 1}`), // Hiển thị nhãn theo ngày
        datasets: [
            {
                label: `Doanh thu theo ngày trong tháng ${selectedMonth} năm ${selectedYear}`,
                data: dailyRevenueData, // Sử dụng dữ liệu từ API
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const optionsDaily = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Thống kê doanh thu tháng ${selectedMonth} - ${selectedYear}`,
            },
        },
    };

    return (
        <>
            <div className="overvew-container">
                <div className="overview-heading">
                    <div className="overview-customer">
                        <h3>Khách hàng</h3>
                        <h4>
                            <span>+ </span>
                            {countCustomer}
                        </h4>
                    </div>
                    <div className="overview-products">
                        <h3>Sản phẩm</h3>
                        <h4>
                            <span>+ </span>
                            {countProduct}
                        </h4>
                    </div>
                    <div className="overview-orders">
                        <h3>Sản phẩm đã bán</h3>
                        <h4>
                            <span>+ </span>
                            {countOrder}
                        </h4>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="month-selector" style={{ marginRight: '40px' }}>
                        <label htmlFor="month-select">Chọn tháng: </label>
                        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                            <option value="1">Tháng 1</option>
                            <option value="2">Tháng 2</option>
                            <option value="3">Tháng 3</option>
                            <option value="4">Tháng 4</option>
                            <option value="5">Tháng 5</option>
                            <option value="6">Tháng 6</option>
                            <option value="7">Tháng 7</option>
                            <option value="8">Tháng 8</option>
                            <option value="9">Tháng 9</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                    </div>
                    <div className="year-selector">
                        <label htmlFor="year-select">Chọn năm: </label>
                        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                            <option value="2022">Năm 2022</option>
                            <option value="2023">Năm 2023</option>
                            <option value="2024">Năm 2024</option>
                            <option value="2025">Năm 2025</option>
                        </select>
                    </div>
                </div>
                <div className="chart-container">
                    <Line data={dataDaily} options={optionsDaily} />
                </div>
                <div className="chart-container">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
}

export default Overview;
