import connectionPool from "../db_connection.js";
import bcrypt from "bcrypt";
import { generateToken } from "../jwt.js";

export default async function login(username, password) {
    const selectQuery = `SELECT * FROM admini WHERE nume = $1`;
    const dbConnection = await connectionPool.connect();
    try {
        const result = await dbConnection.query(selectQuery, [username]);
        if (result.rows.length === 0) {
            return('404');
        }
        const admin = result.rows[0];
        const storedPasswordHash = admin.hash_parola;
        const match = await bcrypt.compare(password, storedPasswordHash);
        if (match) {
            const token = generateToken({admin: admin.nume});
            return(token);
        } else {
            return('401');
        }
    } catch (error) {
        return(error.message);
    } finally {
        dbConnection.release();
    }
}