import fs from 'fs';
import connectionPool from '../db_connection.js';
import { fetchAppProperties } from '../shared.js';

async function processMediiDataset(year, month) {
    const insertOrUpdateQuery = `INSERT INTO medii (judet, total, femei, barbati, total_urban, urban_femei, urban_barbati, total_rural, rural_femei, rural_barbati, luna)` + 
        ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ` +
        ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
        ` total = EXCLUDED.total,` +
        ` femei = EXCLUDED.femei,` +
        ` barbati = EXCLUDED.barbati,` +
        ` total_urban = EXCLUDED.total_urban,` +
        ` urban_femei = EXCLUDED.urban_femei,` +
        ` urban_barbati = EXCLUDED.urban_barbati,` +
        ` total_rural = EXCLUDED.total_rural,` +
        ` rural_femei = EXCLUDED.rural_femei,` +
        ` rural_barbati = EXCLUDED.rural_barbati`;
    const yearAndMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const datasetPath = `../../data/medii/${yearAndMonth}.csv`;
    var rowsModified = 0;
    const dbConnection = await connectionPool.connect();
    try {
        const dataset = await fs.promises.readFile(datasetPath, 'utf-8');
        const dataRows = dataset.split('\n').slice(1);
        await dbConnection.query('BEGIN');
        for (var row of dataRows) {
            const values = row.trim().split(',').filter(value => value !== '');
            if (values.length == 0)
                continue;
            if (values.length != 10)
                throw `Failed to process 'medii' dataset at ${datasetPath} with error: Invalid row in dataset: ${row}`;
            const adjustedValues = values.slice(0, 10);
            const queryResult = await dbConnection.query(insertOrUpdateQuery, [...adjustedValues, yearAndMonth]);
            if (queryResult.rowCount > 0) {
                rowsModified++;
            }
        }
        dbConnection.query('COMMIT');
        return `${rowsModified} rows modified successfully`;
    } catch (error) {
        dbConnection.query('ROLLBACK');
        console.log(`Failed to process 'medii' dataset at ${datasetPath} with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}

async function updateMediiTable(lastStoredYear, lastStoredMonth, monthsToGoBack) {
    var { lastStoredYear, lastStoredMonth, monthsToGoBack } = fetchAppProperties();
    var updatedFields = 0;
    var errorOccured = "";
    while (monthsToGoBack > 0) {
        const result = await processMediiDataset(lastStoredYear, lastStoredMonth);
        if (result != undefined && result[0] != 'F') {
            updatedFields += parseInt(result.split(' ')[0]);
        } else {
            errorOccured = result;
            break;
        }
        lastStoredMonth--;
        if (lastStoredMonth == 0) {
            lastStoredMonth = 12;
            lastStoredYear--;
        }
        monthsToGoBack--;
    }
    if (errorOccured != "") {
        console.log(`Failed to update 'medii' table with error: ${errorOccured}`);
    } else {
        console.log(`Successfully updated 'medii' table with ${updatedFields} rows`);
    }
}

function updateDatabaseFromDatasets() {
    updateMediiTable();
    //updateRateTable();
    //updateNiveleEducatieTable();
    //updateVarsteTable();
}
updateDatabaseFromDatasets();
//export default updateDatabaseFromDatasets;