const { createCliente } = require('redis');

// Configurar host e portas de conexão
const redisClient = createCliente ({
    url: 'redis://localhost:6379'
});

// Verificar se conectou ao servidor Redis
redisClient.on('error', (err) => console.log('Erro ao concetar ao Redis', err));

(async () => {
    await redisClient.connect();

})();

module.exports = redisClient