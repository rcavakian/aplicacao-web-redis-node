const redisClient =  require ("../database/database");

// Função que adiciona usuário no set
async function addUserToSet(userId, timeStamp) {
    await redisClient.zAdd('users', `${timeStamp}`, `${userId}`);
}

// Função que lista todos os usuários do Set
async function getAllUsersFromSet() {
    const allUsers = await redisClient.zRange('users', 0, -1);
}

// Função que retorna um usuário
async function getUserFromSet(redisClient, userId) {

}

// Função que atualiza um usuário
function updateUserFromSet(redisClient, userId, timeStamp) {

}

// Função que remove um usuário do Set
function deleteUserFromSet(redisClient, userId) {

}

module.exports = { addUserToSet, getAllUsersFromSet, getUserFromSet, updateUserFromSet, deleteUserFromSet }