import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';
export default function Status(props)
{
    
    useEffect(() => {
        const ctx = document.getElementById('myChartStat');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const myChartStat = new Chart(ctx, {
            type: 'bar',
            data: {

                labels: props.statusData.map(x =>  monthNames[new Date(x.date_time).getMonth()] + " " + new Date(x.date_time).getDate() + " " + new Date(x.date_time).getFullYear()),
                datasets: [{
                    label: 'Status',
                    data: props.statusData.map(x => x.online ? 1:0),

                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Status',

                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }, [])

    return (
        <canvas id="myChartStat" width="200" height="200"></canvas>
        // {/* <span> {props.humidityData.humidity} </span></>  */}
    );
}