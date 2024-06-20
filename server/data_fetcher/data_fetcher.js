import connectionPool from "../db_connection.js";
import { fetchAppProperties } from "../shared.js";

const criterionToTable = new Map([
    ['residency', 'medii'],
    ['education', 'nivele_educatie'],
    ['age', 'varste'],
    ['gender', 'rate']
])

function getStringDate(date) {
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}`;
}

async function reduceData(data) {
    const reducedData = new Map();
    for (const row of data) {
        const county = row.judet.toString().includes('BUC') ? 'BUCURESTI' : row.judet.trim();
        if (!reducedData.has(county)) {
            const newValue = {};
            for (const field in row) {
                if (field !== 'judet' && field !== 'luna')
                    newValue[field] = Number(row[field]);
            }
            reducedData.set(county, newValue);
        } else {
            const currentValues = reducedData.get(county);
            for (const field in row) {
                if (field !== 'judet' && field !== 'luna')
                    currentValues[field] += Number(row[field]);
            }
        }
    }
    return reducedData;
}

async function fetchData(monthsCount, criterion, counties) {
    const { lastStoredYear, lastStoredMonth } = fetchAppProperties();
    const endDate = new Date(lastStoredYear, lastStoredMonth);
    const startDate = new Date(lastStoredYear, lastStoredMonth - monthsCount + 1);
    const endDateString = getStringDate(endDate);
    const startDateString = getStringDate(startDate);
    const table = criterionToTable.get(criterion);
    const wholeCountrySelectQuery = `SELECT * FROM ${table}` +
        ` WHERE luna >= $1 AND luna <= $2`;
    const givenCountiesSelectQuery = `SELECT * FROM ${table}` +
        ` WHERE luna >= $1 AND luna <= $2 AND judet = ANY($3)`;
    const dbConnection = await connectionPool.connect();
    try {
        var result;
        if (counties.length == 0) {
            result = await dbConnection.query(wholeCountrySelectQuery, [startDateString, endDateString]);
        } else {
            const normalizedCounties = counties.map(county => county.trim().toUpperCase());
            result = await dbConnection.query(givenCountiesSelectQuery, [startDateString, endDateString, normalizedCounties]);
        }
        return reduceData(result.rows);
    } catch (error) {
        console.log(`Failed to fetch data from database with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}

export default fetchData;