import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const baseResourcesUri = 'https://data.gov.ro/dataset/somajul-inregistrat';
const baseDestinationDirectory = '../../data'
var lastStoredMonth;
var lastStoredYear;
var monthsToGoBack;

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

function fetchAppProperties() {
    const appProperties = fs.readFileSync('../../app.properties', 'utf8');
    const lines = appProperties.split('\n');
    lastStoredYear = parseInt(lines[0].split('=')[1]);
    lastStoredMonth = parseInt(lines[1].split('=')[1]);
    monthsToGoBack = parseInt(lines[2].split('=')[1]);
}

function buildDestinationFile(datasetUri) {
    const datasetName = getDatasetNameFromUri(datasetUri);
    var destinationDirectory = `${baseDestinationDirectory}`;
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
        return `Failed to download dataset at ${datasetUri} with error: Invalid dataset type`;
    }
    destinationDirectory += `/${lastStoredYear}-${lastStoredMonth.toString().padStart(2, '0')}.csv`;
    return destinationDirectory;
}

async function downloadSingleDataset(datasetUri) {
    const response = await axios.get(datasetUri, { responseType: 'stream' });
    if (response.status != 200) {
        return `Failed to download dataset at ${datasetUri} with error: ${error}`;
    }
    const destinationFile = buildDestinationFile(datasetUri);
    if (destinationFile.includes('Failed')) {
        return destinationFile;
    }
    const fileWriter = fs.createWriteStream(`${destinationFile}`);
    response.data.pipe(fileWriter);
    return "Success";
}

async function downloadDatasets() {
    fetchAppProperties();
    var datasetsDownloaded = 0;
    var errorOccured = "";

    while (monthsToGoBack > 0) {
        const resourceUri = `${baseResourcesUri}-${MMtoMonth[lastStoredMonth]}-${lastStoredYear}`;
        const resourcesPage = await axios.get(resourceUri);
        if (resourcesPage.status != 200) {
            console.log(`Failed to fetch ${resourceUri}`);
            continue;
        }
        const datasetUris = getDatasetsUrisFromPage(resourcesPage.data);
        for (const datasetUri of datasetUris) {
            const successStatus = await downloadSingleDataset(datasetUri);
            if (successStatus == "Success") {
                datasetsDownloaded++;
            } else {
                errorOccured = successStatus;
                break;
            }
        }

        lastStoredMonth--;
        if (lastStoredMonth == 0) {
            lastStoredMonth = 12;
            lastStoredYear--;
        }
        monthsToGoBack--;
    }
    if (errorOccured != "") {
        console.log(`${errorOccured}`);
    } else {
        console.log(`Successfully downloaded ${datasetsDownloaded} datasets`);
    }
}
downloadDatasets();
//export default downloadSingleDataset;