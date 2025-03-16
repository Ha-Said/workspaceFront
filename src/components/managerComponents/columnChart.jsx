import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { getUserSignupsLastSixMonths } from '../../ApiCalls/apiCalls';

const ColumnChart = () => {
  const [signupsData, setSignupsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserSignupsLastSixMonths();
        const categories = Object.keys(data);
        const seriesData = Object.values(data);

        const options = {
          series: [
            {
              name: "Signups",
              data: seriesData,
              color: "#1A56DB",
            }
          ],
          chart: {
            type: "bar",
            width: "100%",
            height: "100%",
            toolbar: {
              show: false,
            }
          },
          fill: {
            opacity: 1,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "100%",
              borderRadiusApplication: "end",
              borderRadius: 6,
              dataLabels: {
                position: "top",
              },
            },
          },
          legend: {
            show: true,
            position: "bottom",
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            shared: true,
            intersect: false,
            formatter: function (value) {
              return value + " Signups";
            }
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
              },
              formatter: function(value) {
                return value + " Signups";
              }
            },
            categories: categories,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
              }
            }
          },
          grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
              left: 2,
              right: 2,
              top: -20
            },
          },
        };

        const chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();
      } catch (error) {
        console.error('Error fetching signups data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Signups</dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">Last 6 Months</dd>
        </dl>
      </div>

      <div id="bar-chart"></div>
    </div>
  );
};

export default ColumnChart;