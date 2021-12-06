import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';
export default function Humidity(props) {
    function getAvgForDay() {
        let prevDay = props.humidityData.map(x => new Date(x.date_time).getDate())
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        prevDay = prevDay[0]
        const arrofAvg = []
        let avgVal = 0
        let counter = 0
        props.humidityData.forEach(element => {
            let mycurrdate = new Date(element.date_time).getDate()

            if (mycurrdate == prevDay) {
                avgVal += element.humidity * 100
                counter++
            }
            else {
                prevDay = mycurrdate
                avgVal = avgVal / counter
                arrofAvg.push({
                    "day": monthNames[new Date(element.date_time).getMonth()] + " " + new Date(element.date_time).getDate() + " " + new Date(element.date_time).getFullYear(),
                    "dayAvg": avgVal.toFixed(2)
                })
                avgVal = 0
                counter = 0
                mycurrdate = new Date(element.date_time).getDate()
            }
        });
        return arrofAvg
    }
    useEffect(() => {
        const ctx = document.getElementById('myChartHumid');
        let mydates = getAvgForDay()
        console.log(mydates.map(x => x.dayAvg))
        const myChartHumid = new Chart(ctx, {
            type: 'line',
            data: {

                labels: mydates.map(x => x.day),
                datasets: [{
                    label: 'Humidity (%)',
                    data: mydates.map(x => x.dayAvg),

                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Humidity',

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
        <canvas id="myChartHumid" width="200" height="200"></canvas>
        // {/* <span> {props.humidityData.humidity} </span></>  */}
    );
}