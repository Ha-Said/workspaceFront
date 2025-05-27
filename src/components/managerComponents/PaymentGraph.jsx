import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { getPaimentsLastSixMonths } from '../../ApiCalls/apiCalls';

const PaymentGraph = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [monthNames, setMonthNames] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0); // New state for total payments

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaimentsLastSixMonths();
        const amounts = data.map(paiment => paiment.amount); // Assuming paiment has an 'amount' field
        setPaymentData(amounts);

        const total = amounts.reduce((acc, amount) => acc + amount, 0); // Calculate total payments
        setTotalPayments(total);

        const months = data.map(paiment => {
          const date = new Date(paiment.date);
          return date.toLocaleString('default', { month: 'long' });
        });
        setMonthNames(months);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    series: [
      {
        name: "Payments",
        data: paymentData,
        color: "#7E3BF2",
      },
    ],
    chart: {
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: monthNames,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return  value + "DT";
        },
      },
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(document.getElementById("data-series-chart"), options);
    chart.render();
  }, [paymentData, monthNames]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {Math.round(totalPayments)} DT
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales In Last 6 Months</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          23%
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
          </svg>
        </div>
      </div>
      <div id="data-series-chart" className="w-full"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
        <div className="flex justify-between items-center pt-5">
          <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentGraph;