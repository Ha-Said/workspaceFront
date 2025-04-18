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
            height: "100%",
            width: "100%",
            toolbar: {
              show: false,
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            }
          },
          fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: ["#1A56DB"],
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 100]
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "70%",
              borderRadius: 6,
              borderRadiusApplication: "end",
              dataLabels: {
                position: "top",
              },
            },
          },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "12px",
            markers: {
              width: 12,
              height: 12,
              radius: 12,
            },
            itemMargin: {
              horizontal: 8,
              vertical: 0
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val;
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#1A56DB"]
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#6B7280",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
              },
              formatter: function (val) {
                return val;
              }
            },
            title: {
              text: "Number of Signups",
              style: {
                color: "#6B7280",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
              }
            }
          },
          tooltip: {
            shared: true,
            intersect: false,
            style: {
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            },
            y: {
              formatter: function (val) {
                return val + " Signups";
              }
            }
          },
          responsive: [{
            breakpoint: 640,
            options: {
              chart: {
                height: 300
              },
              dataLabels: {
                enabled: false
              }
            }
          }]
        };

        const chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();

        // Cleanup function
        return () => {
          chart.destroy();
        };
      } catch (error) {
        console.error('Error fetching signups data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-center border-gray-200 border-b dark:border-gray-700 pb-3 mb-4">
        <div>
          <h5 className="text-base font-normal text-gray-500 dark:text-gray-400">Signups</h5>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Last 6 Months</h3>
        </div>
      </div>
      <div className="relative" style={{ height: '400px' }}>
        <div id="bar-chart" className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default ColumnChart;