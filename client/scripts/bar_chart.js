export function generateBarChart(ctx, labels, itemData) {
    let colors = ['rgb(232, 156, 35)', 'rgb(116, 14, 171)', 'rgb(62, 242, 7)', 'rgb(24, 11, 214)', 'rgb(245, 32, 57)', 'rgb(235, 223, 5)', 'rgb(204, 10, 175)', 'rgb(106, 252, 238)', 'rgb(50, 105, 168)'];
    
    const data = {
        labels: labels,
        datasets: [{
            data: itemData,
            backgroundColor: colors
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Bar Chart'
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