import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useEffect } from 'react';

let chart

export default function Status(props)
{
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    useEffect(() => {
        const ctx = document.getElementById('myChartStat');
        chart = new Chart(ctx, {
            type: 'line',
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
                        text: 'Status (daily)',

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
        const ctx = document.getElementById('myChartStat');
        chart.destroy()
        if(month == -1){
            chart = new Chart(ctx, {
                type: 'line',
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
                            text: 'Status (daily)',
    
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            return
        }
        let arrayOfMonthStat = props.statusData.filter(element => new Date(element.date_time).getMonth() == month)
        chart = new Chart(ctx, {
            type: 'line',
            data: {

                labels:  arrayOfMonthStat.map(x =>  monthNames[new Date(x.date_time).getMonth()] + " " + new Date(x.date_time).getDate() + " " + new Date(x.date_time).getFullYear()),
                datasets: [{
                    label: 'Status',
                    data:  arrayOfMonthStat.map(x => x.online ? 1:0),

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
                        text: `Status ${monthNames[month]} (Daily)`,

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
        let select = document.getElementById("statusSelect")?.value;
        getOnMonth(select)
    }

    let optionSelect = null;
    if(props.statusData != null){
        optionSelect = 
        <select id="statusSelect" onChange={changeMonth}>
            <option value={-1}>All</option>
            {getMonthList().map(item => <option key={item.id} value={item}>{monthNames[item]}</option>)}
        </select>
    }

    return (
        <>
        {optionSelect}
        <canvas id="myChartStat" width="200" height="200"></canvas>
        </>
    );
}