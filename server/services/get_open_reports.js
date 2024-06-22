import connectionPool from '../db_connection.js';

async function fetchOpenReports() {
    const client = await connectionPool.connect();
    try {
        const query = 'SELECT * FROM rapoarte WHERE status = 0 ORDER BY data DESC';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export default fetchOpenReports;