export function exportAsCsv(chart, counties) {
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    let csvContent = "data:text/csv;charset=utf-8,"
                    + labels.join(",") + "\n"
                    + data.join(",") + "\n\n"
                    + "Selected Counties:,";
    if(counties.length === 0) {
        csvContent += "Total Tara";
    } else {
        csvContent += counties.join(",");
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportAsSvg(chart, filename) {
    const originalOptions = {
        animation: chart.config.options.animation,
        responsive: chart.config.options.responsive,
    };

    chart.config.options.animation = false;
    chart.config.options.responsive = false;
    if (chart.config.options.animation !== false) {
        console.warn('Cannot create PNG: "animation" is not set to false (see the options section)');
        return;
    }
      if (chart.config.options.responsive !== false) {
        console.warn('Cannot create PNG: "responsive" is not set to false (see the options section)');
        return;
    }
    tweakLib();

    let chartCanvas = document.getElementById('chartCanvas');
    let width = chartCanvas.offsetWidth;
    let height = chartCanvas.offsetHeight;
    
    let svgContext = new C2S(width, height);
    let svgChart = new Chart(svgContext, chart.config);
    let link = document.createElement('a');
    link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContext.getSerializedSvg());
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    chart.config.options.animation = originalOptions.animation;
    chart.config.options.responsive = originalOptions.responsive;
    chart.update();
}
function tweakLib() {
    C2S.prototype.getContext = function(contextId) {
      if (contextId === '2d' || contextId === '2D') {
        return this;
      }
      return null;
    }
    C2S.prototype.style = function() {
      return this.__canvas.style;
    }
    C2S.prototype.getAttribute = function(name) {
      return this[name];
    }
    C2S.prototype.addEventListener = function(type, listener, eventListenerOptions) {
    }
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
    if (counties.length === 0) {
        pdf.text('Total Tara', textXPosition, textYPosition);
    }
    pdf.save("chart.pdf");
}