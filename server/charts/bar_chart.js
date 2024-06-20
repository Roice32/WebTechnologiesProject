function generateBarChart(ctx) {
    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let itemData = [65, 59, 80, 81, 56, 55, 40];
    let colors = ['rgb(232, 156, 35)', 'rgb(116, 14, 171)', 'rgb(62, 242, 7)', 'rgb(24, 11, 214)', 'rgb(245, 32, 57)', 'rgb(235, 223, 5)', 'rgb(204, 10, 175)', 'rgb(232, 156, 35)', 'rgb(116, 14, 171)'];
    
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
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                    text: 'Bar Chart'
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