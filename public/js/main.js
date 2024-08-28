const { createClient } = require('redis');

// Confirgurar o host e a porta de conexão
const redisClient = createClient ({
    url: 'redis://localhost:6379'
});

// Verificar se conectou ao servidor Redis
redisClient.on('error', (err) => console.error('Erro ao conectar ao Redis', err));

(async () => {
    await redisClient.connect();

    // Realizar uma operação de teste com string chave: 'chave' e valor: 'valor'
    await redisClient.set('chave', 'valor');
    const valor = await redisClient.get('chave');
    console.log(`Valor: ${valor}`);

    // Fechar conexão
    await redisClient.quit();
})();

