import connectionPool from '../db_connection.js'
import { v4 as uuidv4 } from 'uuid'

export default async function sendReport(email, type, description) {
    const newId = uuidv4();
    const insertQuery = `INSERT INTO rapoarte (id, data, status, tip, email, descriere)` +
        ` VALUES ($1, NOW(), 0, $2, $3, $4)`;
    const dbConnection = await connectionPool.connect();
    try {
        await dbConnection.query(insertQuery, [newId, type, email, description]);
    } catch (error) {
        console.log(`Failed to insert report with error: ${error}`);
    } finally {
        dbConnection.release();
    }
}