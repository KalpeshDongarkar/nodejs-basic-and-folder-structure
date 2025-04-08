const dbkeys = require('../database/db.keys');
const MYSQL = require("mysql2/promise");

var mysqlDbPool = MYSQL.createPool(dbkeys.dbCfigKey);

mysqlDbPool.on('connection', () => {
    console.log('A new MySQL connection was established.');
});

mysqlDbPool.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('MySQL Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('MySQL Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
        console.error('MySQL Database connection was refused.');
    } else if (err.code === 'ETIMEDOUT') {
        console.error('MySQL Database connection timed out.');
    } else {
        console.error('MySQL Database error:', err);
    }
});

module.exports.mySqlDbPool = mysqlDbPool;

module.exports.mysqlProdExtr = async function (prodname, params) {
    var resultData;
    try {
        const execution = mysqlDbPool.query;

        resultData = await execution('call ' + prodname + '(?)', [params]);
        resultData = JSON.parse(JSON.stringify(resultData))

        if (resultData.length > 2) {
            return resultData;
        } else {
            return resultData[0];
        }
    } catch (Err) {
        console.error('Error executing stored procedure:', Err);
        var resultData = { status: 0, alertmessage: `${Err}` }
        return { resultData };
    }
}

module.exports.mysqlReadProdExtr = async function (prodname, params) {
    var resultData;
    try {
        const execution = mysqlDbPool.query;

        resultData = await execution('call ' + prodname + '(?)', [params]);
        resultData = JSON.parse(JSON.stringify(resultData))

        if (resultData.length > 2) {
            return resultData;
        } else {
            return resultData[0];
        }
    } catch (Err) {
        console.error('Error executing stored procedure:', Err);
        var resultData = { status: 0, alertmessage: `${Err}` }
        return { resultData };
    }
}

module.exports.mysqlWrtProdExtr = async function (prodname, params) {
    var resultData;
    try {
        const execution = mysqlDbPool.query;

        resultData = await execution('call ' + prodname + '(?)', [params]);
        resultData = JSON.parse(JSON.stringify(resultData))

        if (resultData.length > 2) {
            return resultData;
        } else {
            return resultData[0];
        }
    } catch (Err) {
        console.error('Error executing stored procedure:', Err);
        var resultData = { status: 0, alertmessage: `${Err}` }
        return { resultData };
    }
}