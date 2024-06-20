import pg from 'pg';
const { Pool } = pg;

const connectionPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'UnXDb',
    password: 'STUDENT',
    port: 5432,
    max: 32
});

export default connectionPool;