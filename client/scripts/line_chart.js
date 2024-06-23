export function generateLineChart(ctx, labels, itemData) {
    
    const data = {
        labels: labels,
        datasets: [{
            data: itemData,
            borderColor: 'rgb(232, 156, 35)',
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Line Chart'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'black',  
                        fontSize: 14,
                        fontFamily: 'Arial',      
                        fontStyle: 'bold'   
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'black', 
                        fontSize: 14,
                        fontFamily: 'Arial',         
                        fontStyle: 'bold'      
                    }
                }]
            }
        }
    };

    return new Chart(ctx, config);
}