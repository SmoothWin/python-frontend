import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';
export default function Temperature(props) {
    function getAvgForDay() {
        console.log(props.temperatureData)
        let prevDay = props.temperatureData.map(x => new Date(x.date_time).getDate())
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        prevDay = prevDay[0]
        const arrofAvg = []
        let avgVal = 0
        let counter = 0
        props.temperatureData.forEach(element => {
            let mycurrdate = new Date(element.date_time).getDate()

            if (mycurrdate == prevDay) {
                avgVal += element.temperature
                counter++
            }
            else {
                prevDay = mycurrdate
                avgVal = avgVal / counter
                arrofAvg.push({
                    "day": monthNames[new Date(element.date_time).getMonth()] + " " + new Date(element.date_time).getDate() + " " + new Date(element.date_time).getFullYear(),
                    "dayAvg": avgVal.toFixed(1)
                })
                avgVal = 0
                counter = 0
                mycurrdate = new Date(element.date_time).getDate()
            }
        });
        return arrofAvg
    }
    useEffect(() => {
        const ctx = document.getElementById('myChartTemp');
        let mydates = getAvgForDay()
        console.log(mydates.map(x => x.dayAvg))
        const myChartTemp = new Chart(ctx, {
            type: 'line',
            data: {

                labels: mydates.map(x => x.day),
                datasets: [{
                    label: 'Temperature C',
                    data: mydates.map(x => x.dayAvg),

                    backgroundColor: [

                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Temperature',

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
        <canvas id="myChartTemp" width="200" height="200"></canvas>
    );
}