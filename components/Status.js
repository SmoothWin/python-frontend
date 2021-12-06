import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';
export default function Status(props)
{
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    useEffect(() => {
        const ctx = document.getElementById('myChartStat');
        new Chart(ctx, {
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

    function getMonthList(){
        let arrayMonth = props.statusData.map(element => new Date(element.date_time).getMonth())
        let set = new Set(arrayMonth)
        return Array.from(set)
    }
    function getOnMonth(month){
        let arrayOfMonthStat = props.statusData.filter(element = new Date(element.date_time).getMonth() == month)
        
        return arrayOfMonthStat
    }

    let optionSelect = null;
    if(props.statusData != null){
        optionSelect = 
        <select>
            <option value={-1}>All</option>
            {getMonthList().map(item => <option value={item}>{monthNames[item]}</option>)}
        </select>
    }

    return (
        <>
        {optionSelect}
        <canvas id="myChartStat" width="200" height="200"></canvas>
        </>
    );
}