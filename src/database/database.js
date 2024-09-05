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
    // Testar o comando hgetall chave 1
    const value = await redisClient.hGetAll('1');
    console.log('Valor obtido de Redis:', value);
})();

module.exports = { redisClient };