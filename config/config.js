const mssql = require('mssql');
const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: 'localhost',
    database: process.env.DB_NAME,
    pool : {
        max : 10,
        min : 0,
        idleTimeoutMillis : 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};

// if use windows authentication
// const sqlConfig = {
//     server: 'localhost',
//     database: process.env.DB_NAME,
//     options: {
//        trustedConnection: true,
//         instancename: 'SQLEXPRESS',
//         encrypt: false,
//         trustServerCertificate: false
//     },
//     pool : {
//         max : 10,
//         min : 0,
//         idleTimeoutMillis : 30000
//     }
// };

mssql.connect(sqlConfig).then(pool => {
    if (pool.connecting) {
        console.log('Connecting to database...');
    }
    if (pool.connected) {
        console.log('Connected to database');
    }
    if (pool.connecting) {
        console.log('Disconnecting to database...');
    }
    if (pool.disconnected) {
        console.log('Disconnected to database');
    }
    return pool;
}
).catch(err => {
    console.log(err);
}
);

module.exports = {
    mssql,
    sqlConfig
}
