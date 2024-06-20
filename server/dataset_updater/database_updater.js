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
            while (values.length < 10)
                values.push('0');
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
        return -1;
    } else {
        console.log(`Successfully updated 'medii' table with ${updatedFields} rows`);
        return updatedFields;
    }
}

function getRidOfQuotes(row) {
    var result = '';
    var insideQuotes = false;
    for (var i = 0; i < row.length; i++) {
        if (row[i] == '"') {
            insideQuotes = !insideQuotes;
        } else if (row[i] == ',' && insideQuotes) {
            continue;
        } else {
            result += row[i];
        }
    }
    return result;
}

async function processRateDataset(year, month) {
    const insertOrUpdateQuery = `INSERT INTO rate (judet, total, femei, barbati, indemnizati, neindemnizati, rata, rata_feminina, rata_masculina, luna)` +
    ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ` +
    ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
    ` total = EXCLUDED.total,` +
    ` femei = EXCLUDED.femei,` +
    ` barbati = EXCLUDED.barbati,` +
    ` indemnizati = EXCLUDED.indemnizati,` +
    ` neindemnizati = EXCLUDED.neindemnizati,` +
    ` rata = EXCLUDED.rata,` +
    ` rata_feminina = EXCLUDED.rata_feminina,` +
    ` rata_masculina = EXCLUDED.rata_masculina`;
    const yearAndMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const datasetPath = `../../data/rate/${yearAndMonth}.csv`;
    var rowsModified = 0;
    const dbConnection = await connectionPool.connect();
    try {
        const dataset = await fs.promises.readFile(datasetPath, 'utf-8');
        const dataRows = dataset.split('\n').slice(1);
        await dbConnection.query('BEGIN');
        for (var row of dataRows) {

            const values = getRidOfQuotes(row).trim().split(',').filter(value => value !== '');
            if (values.length == 0)
                continue;
            while (values.length < 9)
                values.push('0');
            const adjustedValues = values.slice(0, 9);
            const queryResult = await dbConnection.query(insertOrUpdateQuery, [...adjustedValues, yearAndMonth]);
            if (queryResult.rowCount > 0) {
                rowsModified++;
            }
        }
        dbConnection.query('COMMIT');
        return `${rowsModified} rows modified successfully`;
    } catch (error) {
        dbConnection.query('ROLLBACK');
        console.log(`Failed to process 'rate' dataset at ${datasetPath} with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}

async function updateRateTable(lastStoredYear, lastStoredMonth, monthsToGoBack) {
    var { lastStoredYear, lastStoredMonth, monthsToGoBack } = fetchAppProperties();
    var updatedFields = 0;
    var errorOccured = "";
    while (monthsToGoBack > 0) {
        const result = await processRateDataset(lastStoredYear, lastStoredMonth);
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
        console.log(`Failed to update 'rate' table with error: ${errorOccured}`);
        return -1;
    } else {
        console.log(`Successfully updated 'rate' table with ${updatedFields} rows`);
        return updatedFields;
    }
}

async function processNiveleEducatieDataset(year, month) {
    const insertOrUpdateQuery = `INSERT INTO nivele_educatie (judet, total, fara_studii, primar, gimnazial, liceal, postliceal, profesional_arte_si_meserii, universitar, luna)` +
    ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ` +
    ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
    ` total = EXCLUDED.total,` +
    ` fara_studii = EXCLUDED.fara_studii,` +
    ` primar = EXCLUDED.primar,` +
    ` gimnazial = EXCLUDED.gimnazial,` +
    ` liceal = EXCLUDED.liceal,` +
    ` postliceal = EXCLUDED.postliceal,` +
    ` profesional_arte_si_meserii = EXCLUDED.profesional_arte_si_meserii,` +
    ` universitar = EXCLUDED.universitar`;
    const yearAndMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const datasetPath = `../../data/nivele_educatie/${yearAndMonth}.csv`;
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
            const adjustedValues = values.slice(0, 9);
            while (adjustedValues.length < 9)
                adjustedValues.push('0');
            const queryResult = await dbConnection.query(insertOrUpdateQuery, [...adjustedValues, yearAndMonth]);
            if (queryResult.rowCount > 0) {
                rowsModified++;
            }
        }
        dbConnection.query('COMMIT');
        return `${rowsModified} rows modified successfully`;
    } catch (error) {
        dbConnection.query('ROLLBACK');
        console.log(`Failed to process 'nivele_educatie' dataset at ${datasetPath} with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}

async function updateNiveleEducatieTable(lastStoredYear, lastStoredMonth, monthsToGoBack) {
    var { lastStoredYear, lastStoredMonth, monthsToGoBack } = fetchAppProperties();
    var updatedFields = 0;
    var errorOccured = "";
    while (monthsToGoBack > 0) {
        const result = await processNiveleEducatieDataset(lastStoredYear, lastStoredMonth);
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
        console.log(`Failed to update 'nivele_educatie' table with error: ${errorOccured}`);
        return -1;
    } else {
        console.log(`Successfully updated 'nivele_educatie' table with ${updatedFields} rows`);
        return updatedFields;
    }
}

async function processVarsteDataset(year, month) {
    const insertOrUpdateQuery = `INSERT INTO varste (judet, total, sub_25, "25_29", "30_39", "40_49", "50_55", peste_55, luna)` +
    ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ` +
    ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
    ` total = EXCLUDED.total,` +
    ` sub_25 = EXCLUDED.sub_25,` +
    ` "25_29" = EXCLUDED."25_29",` +
    ` "30_39" = EXCLUDED."30_39",` +
    ` "40_49" = EXCLUDED."40_49",` +
    ` "50_55" = EXCLUDED."50_55",` +
    ` peste_55 = EXCLUDED.peste_55`;
    const yearAndMonth = `${year}-${month.toString().padStart(2, '0')}`;
    const datasetPath = `../../data/varste/${yearAndMonth}.csv`;
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
            const adjustedValues = values.slice(0, 8);
            while (adjustedValues.length < 8)
                adjustedValues.push('0');
            const queryResult = await dbConnection.query(insertOrUpdateQuery, [...adjustedValues, yearAndMonth]);
            if (queryResult.rowCount > 0) {
                rowsModified++;
            }
        }
        dbConnection.query('COMMIT');
        return `${rowsModified} rows modified successfully`;
    } catch (error) {
        dbConnection.query('ROLLBACK');
        console.log(`Failed to process 'varste' dataset at ${datasetPath} with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}

async function updateVarsteTable(lastStoredYear, lastStoredMonth, monthsToGoBack) {
    var { lastStoredYear, lastStoredMonth, monthsToGoBack } = fetchAppProperties();
    var updatedFields = 0;
    var errorOccured = "";
    while (monthsToGoBack > 0) {
        const result = await processVarsteDataset(lastStoredYear, lastStoredMonth);
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
        console.log(`Failed to update 'varste' table with error: ${errorOccured}`);
        return -1;
    } else {
        console.log(`Successfully updated 'varste' table with ${updatedFields} rows`);
        return updatedFields;
    }
}

async function updateDatabaseFromDatasets() {
    await updateMediiTable();
    await updateRateTable();
    await updateNiveleEducatieTable();
    await updateVarsteTable();
}
updateDatabaseFromDatasets();
//export default updateDatabaseFromDatasets;