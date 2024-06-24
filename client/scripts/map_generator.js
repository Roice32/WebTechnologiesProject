export function generateMapVisualization(response, selectedCounties) {
    const svgMap = document.getElementById('romaniaMap');
    const infoBox = document.getElementById('infoBox');

     
    svgMap.querySelectorAll('path').forEach(path => {
        path.replaceWith(path.cloneNode(true));
    });
    
    let countiesToDisplay = selectedCounties;
    if(countiesToDisplay.length === 0) {
        for(const [county, values] of response) {
            if(!county.includes('Total') && !county.includes('TOTAL')) {
                countiesToDisplay.push(county.toLowerCase());
            }
        }
    }

    svgMap.querySelectorAll('path').forEach(path => {
        const countyName = path.getAttribute('name').toLowerCase();
        if (countiesToDisplay.includes(countyName)) {
            path.addEventListener('mouseover', function () {
                let countyData;
                for (const [county, values] of response) {
                    if (county.toLowerCase() === countyName) {
                        countyData = [county, values];
                        break;
                    }
                }
                if (countyData) {
                    infoBox.innerHTML = `<strong>${countyData[0]}</strong><br>`;
                    for (const [key, value] of Object.entries(countyData[1])) {
                        infoBox.innerHTML += `${key}: ${value}<br>`;
                    }
                    infoBox.style.display = 'block';
                }
            });

            path.addEventListener('mousemove', function (event) {
                infoBox.style.left = event.pageX + 10 + 'px';
                infoBox.style.top = event.pageY + 10 + 'px';
            });

            path.addEventListener('mouseout', function () {
                infoBox.style.display = 'none';
            });

            path.addEventListener('click', function () {
                let countyData;
                for (const [county, values] of Object.entries(response)) {
                    if (county.toLowerCase() === countyName) {
                        countyData = [county, values];
                        break;
                    }
                }
                if (countyData) {
                    alert(`You clicked on ${countyData[0]}`);
                }
            });
        }
    });
}