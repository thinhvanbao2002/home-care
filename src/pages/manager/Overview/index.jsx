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
import { getNumberCustomer, getNumberOrder, getNumberProduct } from '~/services/admin/overview.service';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Overview() {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [countCustomer, setCountCustomer] = useState(0);
    const [countProduct, setCountProduct] = useState(0);
    const [countOrder, setCountOrder] = useState(0);

    const dataByYear = {
        2022: [100, 130, 150, 170, 160, 200, 180, 210, 190, 220, 230, 240],
        2023: [110, 140, 160, 180, 150, 210, 190, 220, 200, 230, 240, 250],
        2024: [120, 150, 180, 200, 170, 220, 190, 230, 210, 240, 250, 260],
    };

    useEffect(() => {
        numberCustomer();
        getAllProducts();
        getAllOrder();
    }, []);

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

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
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
                data: dataByYear[selectedYear],
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
                <div className="year-selector">
                    <label htmlFor="year-select">Chọn năm: </label>
                    <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className="overview-chart">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
}

export default Overview;
