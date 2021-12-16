import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';


let chart;
export default function Humidity(props) {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function getAvgForDay() {
        let prevDay = props.humidityData.map(x => new Date(x.date_time).getDate())
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
        const ctx = document.getElementById('myChartHumid');
        chart = new Chart(ctx, {
            type: 'line',
            data: {

                labels: arrofAvg.map(x => x.day),
                datasets: [{
                    label: 'Humidity (%)',
                    data: arrofAvg.map(x => x.dayAvg),

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
                        text: 'Humidity (Daily average all months)',

                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    function getMonthList(){
        let arrayMonth = props.humidityData.map(element => new Date(element.date_time).getMonth())
        let set = new Set(arrayMonth)
        return Array.from(set)
    }
    function getOnMonth(month){
        chart.destroy()
        if(month == -1){
            getAvgForDay()
            return
        }
        const ctx = document.getElementById('myChartHumid');
        let arrayOfMonthHum = props.humidityData.filter(element => new Date(element.date_time).getMonth() == month)
        // console.log(arrayOfMonthHum.map(element => element.humidity))
        chart = new Chart(ctx, {
            type: 'line',
            data: {

                labels: arrayOfMonthHum.map(element => monthNames[new Date(element.date_time).getMonth()] + " " + new Date(element.date_time).getDate() + " " + new Date(element.date_time).getFullYear()),
                datasets: [{
                    label: 'Humidity %',
                    data: arrayOfMonthHum.map(element => element.humidity * 100),

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
                        text: `Humidity (daily for ${monthNames[month]})`,

                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    function changeMonth(){
        let select = document.getElementById("humiditySelect")?.value;
        getOnMonth(select)
    }
    useEffect(() => {
        getAvgForDay()
    }, [])
    let optionSelect = null;
    if(props.humidityData != null){
        optionSelect = 
        <select id="humiditySelect" onChange={changeMonth}>
            <option value={-1}>All</option>
            {getMonthList().map(item => <option key={item} value={item}>{monthNames[item]}</option>)}
        </select>
    }

    return (
        <>
        {optionSelect}
        <canvas id="myChartHumid" width="200" height="200"></canvas>
        </>
    );
}