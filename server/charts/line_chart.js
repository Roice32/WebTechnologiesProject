function generateLineChart(ctx) {
    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let itemData = [65, 59, 80, 81, 56, 55, 40];
    
    const data = {
        labels: labels,
        datasets: [{
            data: itemData,
            borderColor: 'rgb(232, 156, 35)',
            fill: false
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                    text: 'Line Chart'
                }
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',   
                        font: {
                            weight: 'bold',   
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'black',   
                        font: {
                            weight: 'bold',  
                        }
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
}