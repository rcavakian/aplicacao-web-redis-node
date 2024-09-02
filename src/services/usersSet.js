import { redisClient }  from "../database/database";

// Função que adiciona usuário no set
async function addUserToSet(userId, timeStamp) {
    await redisClient.zAdd('users', `${timeStamp}`, `${userId}`);
}

// Função que lista todos os usuários do Set
// TODO: implementar função para ler os pares retornados
async function getAllUsersFromSet() {
    const allUsers = await redisClient.zRange('users', 0, -1);
    return allUsers;
}

// Função que retorna o usuario com timestamp, se usuário não cadastrado retorna nil
async function getTimeStampFromSet(userId) {
    const timeStamp = await redisClient.zScore('users', `${userId}`);
    return timeStamp;
}

// Função que atualiza o timestamp de usuário
async function updateUserFromSet(userId, timeStamp) {
    const userFound = await redisClient.zScore('users', `${userId}`);

    if (userFound) {
        await redisClient.zAdd('users', `${timeStamp}`, `${userId}`);
    }
    return userFound;
}

// Função que remove um usuário do Set
async function deleteUserFromSet(userId) {
    const userFound = await redisClient.zScore('users', `${userId}`);

    if (userFound) {
        await redisClient.zRem('user', `${userId}`);
    }
    return userFound;
}

module.exports = { addUserToSet, getAllUsersFromSet, getTimeStampFromSet, updateUserFromSet, deleteUserFromSet }