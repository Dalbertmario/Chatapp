import { createClient } from 'redis';

const Redisclient = createClient();

Redisclient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await Redisclient.connect();
    console.log('Connected to Redis');
})();

export default Redisclient;