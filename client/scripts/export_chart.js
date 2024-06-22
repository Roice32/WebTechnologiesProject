export function exportAsCsv(chart, counties) {
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    let csvContent = "data:text/csv;charset=utf-8,"
                    + labels.join(",") + "\n"
                    + data.join(",") + "\n\n"
                    + "Selected Counties:," + counties.join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportAsSvg(chart) {
    const canvas = chart.canvas;
    const svgContext = new C2S(canvas.width, canvas.height);
    chart.draw(svgContext);
    const svg = svgContext.getSerializedSvg();

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportAsPdf(chart, counties) {
    const canvas = chart.canvas;
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    if (chart.config.type === 'pie') {
        pdf.addImage(imgData, 'PNG', 30, 10, 150, 150);
    } else {
        pdf.addImage(imgData, 'PNG', 10, 10);
    }
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    let textXPosition = 10;
    let textYPosition = 180;
    pdf.setFontSize(11);   
    const labelsPerLine = 3;    
    for (let i = 0; i < labels.length; i++) {
        if (i > 0 && i % labelsPerLine === 0) {
            textXPosition = 10;    
            textYPosition += 10;    
        }
        pdf.text(labels[i] + ': ' + data[i], textXPosition, textYPosition);
        textXPosition += 50;    
    }
    textYPosition += 20;
    pdf.setFontSize(10);
    pdf.text("Selected Counties:", 10, textYPosition);
    textXPosition = 40;
    counties.forEach((county, index) => {
        let countyText = county;
        if (index < counties.length - 1) {
            countyText += ', ';
        }
        if (index > 0 && index % 6 === 0) {
            textXPosition = 10;    
            textYPosition += 10;    
        }
        pdf.text(countyText, textXPosition, textYPosition);
        textXPosition += 25;    
    });
    pdf.save("chart.pdf");
}