const { createCliente } = require('redis');

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;


// Configurar host e portas de conexão
const redisClient = createCliente ({
    url: `redis://${redisHost}:${redisPort}`
});

// Verificar se conectou ao servidor Redis
redisClient.on('error', (err) => console.log('Erro ao concetar ao Redis', err));

(async () => {
    await redisClient.connect();

})();

module.exports = redisClient