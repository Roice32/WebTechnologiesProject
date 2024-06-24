import fs from 'fs';
import connectionPool from '../db_connection.js';
import { normalize } from 'path';

const datasetTypes = ['medii', 'rate', 'nivele_educatie', 'varste'];
const queries = new Map([
    ['medii', `INSERT INTO medii (judet, total, femei, barbati, total_urban, urban_femei, urban_barbati, total_rural, rural_femei, rural_barbati, luna)` + 
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
        ` rural_barbati = EXCLUDED.rural_barbati`],
    ['rate', `INSERT INTO rate (judet, total, femei, barbati, indemnizati, neindemnizati, rata, rata_feminina, rata_masculina, luna)` +
        ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ` +
        ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
        ` total = EXCLUDED.total,` +
        ` femei = EXCLUDED.femei,` +
        ` barbati = EXCLUDED.barbati,` +
        ` indemnizati = EXCLUDED.indemnizati,` +
        ` neindemnizati = EXCLUDED.neindemnizati,` +
        ` rata = EXCLUDED.rata,` +
        ` rata_feminina = EXCLUDED.rata_feminina,` +
        ` rata_masculina = EXCLUDED.rata_masculina`],
    ['nivele_educatie', `INSERT INTO nivele_educatie (judet, total, fara_studii, primar, gimnazial, liceal, postliceal, profesional_arte_si_meserii, universitar, luna)` +
        ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ` +
        ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
        ` total = EXCLUDED.total,` +
        ` fara_studii = EXCLUDED.fara_studii,` +
        ` primar = EXCLUDED.primar,` +
        ` gimnazial = EXCLUDED.gimnazial,` +
        ` liceal = EXCLUDED.liceal,` +
        ` postliceal = EXCLUDED.postliceal,` +
        ` profesional_arte_si_meserii = EXCLUDED.profesional_arte_si_meserii,` +
        ` universitar = EXCLUDED.universitar`],
    ['varste', `INSERT INTO varste (judet, total, sub_25, "25_29", "30_39", "40_49", "50_55", peste_55, luna)` +
        ` VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ` +
        ` ON CONFLICT (judet, luna) DO UPDATE SET ` +
        ` total = EXCLUDED.total,` +
        ` sub_25 = EXCLUDED.sub_25,` +
        ` "25_29" = EXCLUDED."25_29",` +
        ` "30_39" = EXCLUDED."30_39",` +
        ` "40_49" = EXCLUDED."40_49",` +
        ` "50_55" = EXCLUDED."50_55",` +
        ` peste_55 = EXCLUDED.peste_55`]
]);

const expectedColumns = new Map([
    ['medii', 10],
    ['rate', 9],
    ['nivele_educatie', 9],
    ['varste', 8]
]);

function getYearAndMonth(year, month) {
    return `${year}-${month.toString().padStart(2, '0')}`;
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

function normalizeCountyName(county) {
    if(county.includes('BUC')) {
        return 'BUCURESTI';
    }
    if (county.includes('CARA')) {
        return 'CARAS-SEVERIN';  
    }
    if (county.includes('SATU')) {
        return 'SATU-MARE';
    }
    if (county.includes('BISTR')) {
        return 'BISTRITA-NASAUD';
    }
    if (county.includes('TOTAL')) {
        return 'Total TARA';
    }
    return county;
}

async function updateTable(table, year, month) {
    const insertOrUpdateQuery = queries.get(table);
    const yearAndMonth = getYearAndMonth(year, month);
    const datasetPath = `data/${table}/${yearAndMonth}.csv`;
    var rowsModified = 0;
    const dbConnection = await connectionPool.connect();
    try {
        const dataset = await fs.promises.readFile(datasetPath, 'utf-8');
        const dataRows = dataset.split('\n').slice(1);
        await dbConnection.query('BEGIN');
        for (var row of dataRows) {
            const values = (table == 'rate' ? getRidOfQuotes(row) : row ).trim().split(',').filter(value => value !== '');
            if (values.length == 0)
                continue;
            var adjustedValues = values.slice(0, expectedColumns.get(table));
            while (adjustedValues.length < expectedColumns.get(table))
                adjustedValues.push('0');
            adjustedValues[0] = normalizeCountyName(values[0].toUpperCase());
            const queryResult = await dbConnection.query(insertOrUpdateQuery, [...adjustedValues, yearAndMonth]);
            if (queryResult.rowCount > 0) {
                rowsModified++;
            }
        }
        dbConnection.query('COMMIT');
        return `${rowsModified} rows modified successfully in '${table}' table for ${yearAndMonth} dataset.`;
    } catch (error) {
        dbConnection.query('ROLLBACK');
        return `Eroare la actualizarea tabelului '${table}' cu ${datasetPath}: ${error}`;
    } finally {
        dbConnection.release();
    }
}

async function updateDatabaseFromDatasets(parameters) {
    var year = Number(parameters.year);
    var month = Number(parameters.month);
    var monthsCount = Number(parameters.monthsCount);
    while (monthsCount > 0) {
        for (const table of datasetTypes) {
            const result = await updateTable(table, year, month);
            if (result.startsWith('Eroare')) {
                return result;
            }
        }
        month--;
        if (month == 0) {
            month = 12;
            year--;
        }
        monthsCount--;
    }
    return 'Succes';
}

export default updateDatabaseFromDatasets;
