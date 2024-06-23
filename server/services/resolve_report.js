import connectionPool from "../db_connection.js";

async function resolveReport(reportId, response) {
    const client = await connectionPool.connect();
    try {
        client.query('BEGIN');
        const query = 'UPDATE rapoarte SET status = 1, raspuns = $1 WHERE id = $2';
        await client.query(query, [response, reportId]);
        client.query('COMMIT');
        return ('200');
    } catch (error) {
        return (error.message);
    } finally {
        client.release();
    }
}

export default resolveReport;