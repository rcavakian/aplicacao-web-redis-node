require("dotenv").config({ path: ".env"});
const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;


// Configurar host e portas de conexão
const redisClient = createClient();

// Verificar se conectou ao servidor Redis
redisClient.on('error', (err) => console.log('Erro ao concetar ao Redis', err));

(async () => {
    await redisClient.connect();
    console.log('Conectado ao Redis com sucesso');
})();

module.exports = { redisClient };