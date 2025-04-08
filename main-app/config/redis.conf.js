const dbkeys = require('../database/db.keys');
const redis = require("redis");

const resClient = redis.createClient({ url: dbkeys.rdsConfig });

const setupRedisHandlers = (client) => {
    client.on('connect', () => console.log('Connected to Redis!'));
    client.on('error', (err) => console.error('Redis connection error:', err));
};
setupRedisHandlers(resClient)
resClient.connect();

module.exports.EXISTS_REDISKEY = async (params) => {
    try {
        if (await resClient.exists(params)) {
            return true
        } else {
            return false
        }
    } catch (Err) {
        return null;
    }
}

module.exports.GET_REDISKEY = async (params) => {
    try {
        let svdData = await resClient.get(params);
        if (svdData) {
            return JSON.parse(svdData);
        } else {
            return null;
        }
    } catch (Err) {
        return null;
    }
}

module.exports.SET_REDISKEY = async (params, svdata) => {
    try {
        if (svdata) {
            await resClient.set(params, JSON.stringify(svdata));
        }
    } catch (Err) {
        return null;
    }
}

module.exports.DELETE_REDISKEY = async (params) => {
    try {
        await resClient.del(params);
    } catch (Err) {
        return null;
    }
}
