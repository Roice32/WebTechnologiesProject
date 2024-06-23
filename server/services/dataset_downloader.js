import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const baseResourcesUri = 'https://data.gov.ro/dataset/somajul-inregistrat';
var month;
var year;
var monthsCount;

const MMtoMonth = [
    'nonexistent',
    'ianuarie',
    'februarie',
    'martie',
    'aprilie',
    'mai',
    'iunie',
    'iulie',
    'august',
    'septembrie',
    'octombrie',
    'noiembrie',
    'decembrie'
];

function getDatasetsUrisFromPage(resourcesPage) {
    const page = cheerio.load(resourcesPage);
    const datasetUris = [];

    page("a.resource-url-analytics").each((index, element) => {
        datasetUris.push(page(element).attr('href'));
    });

    return datasetUris;
}

function getDatasetNameFromUri(uri) {
    return uri.split('/').pop();
}

function buildDestinationFile(datasetUri) {
    const datasetName = getDatasetNameFromUri(datasetUri);
    var destinationDirectory = 'data';
    const datasetType = datasetName.split('.')[0];
    if (datasetType.includes('rata')) {
        destinationDirectory += '/rate';
    } else if (datasetType.includes('medii')) {
        destinationDirectory += '/medii';
    } else if (datasetType.includes('nivel-educatie')) {
        destinationDirectory += '/nivele_educatie';
    } else if (datasetType.includes('varste')) {
        destinationDirectory += '/varste';
    } else {
        return `Eroare: Tip necunoscut de dataset: ${datasetType}`;
    }
    destinationDirectory += `/${year}-${month.toString().padStart(2, '0')}.csv`;
    return destinationDirectory;
}

async function downloadSingleDataset(datasetUri) {
    const response = await axios.get(datasetUri, { responseType: 'stream' });
    if (response.status != 200) {
        return `Eroare: Nu s-a putut accesa dataset-ul ${datasetUri}`;
    }
    const destinationFile = buildDestinationFile(datasetUri);
    if (destinationFile.includes('Eroare')) {
        return destinationFile;
    }
    const fileWriter = fs.createWriteStream(`${destinationFile}`);
    response.data.pipe(fileWriter);
    return "Success";
}

async function downloadDatasets(parameters) {
    year = Number(parameters.year);
    month = Number(parameters.month);
    monthsCount = Number(parameters.monthsCount);
    var datasetsDownloaded = 0;
    var errorOccured = "";

    while (monthsCount > 0) {
        const resourceUri = `${baseResourcesUri}-${MMtoMonth[month]}-${year}`;
        try {
            const resourcesPage = await axios.get(resourceUri);
            const datasetUris = getDatasetsUrisFromPage(resourcesPage.data);
            for (const datasetUri of datasetUris) {
                const successStatus = await downloadSingleDataset(datasetUri);
                if (successStatus === "Success") {
                    datasetsDownloaded++;
                } else {
                    return successStatus;
                }
            }
        } catch (error) {
            console.log(error);
            return `Eroare: Nu s-a putut accesa pagina ${resourceUri}`;
        }

        month--;
        if (month == 0) {
            month = 12;
            year--;
        }
        monthsCount--;
    }
    if (errorOccured == "") {
        return `Descărcat cu succes ${datasetsDownloaded} dataset-uri`;
    }
}

export default downloadDatasets;