const redisClient = require ('../database/database');
const usersSetService = require ('./usersSet');
import { v4 as uuidv4 } from 'uuid'; // para gerar id unico
const User = require('../models/user');


/**
 * Função que cria um novo usuário e insere no Redis
 * @param {string} login 
 * @param {string} name 
 * @param {string} email 
 * @param {boolean} active ativo (1) ou inativo (0)
 */
async function addUser(User) {
    // Registrar o momento em que o usuário foi criado
    const timeStamp = new Date;

    // Criar novo hash para o usuário
    await redisClient.hSet(`${User.userId}`, 'login', User.login, 'name', User.name, 'email', User.email, 'active', User.active);

    // Incluir novo usuário no Sorted Set usersSet
    usersSetService.addUserToSet(User.userId, timeStamp.toISOString());    
}

/**
 * Função que retorna um usuário
 * @param {string} userId 
 */
async function getUser(User) {
    return await redisClient.hGetAll(`${User.userId}`);
}

/**
 * Função que desativa um usuário
 * 
 * @param {*} userId 
 * @param {boolean} active ativo (1) ou inativo (0)
 */
async function disableUser(userId, active) {
    const userFound = await redisClient.hGetAll(`${userId}`);

    if (userFound) {
        userFound.active = active;
        await redisClient.hSet(`${userId}`, 'active', active)
    }
    return userFound;
}

/**
 * Função que atualiza um usuário
 * @param {*} redisClient 
 * @param {*} userId 
 * @param {*} data 
 * @returns 
 */
async function updateUser (redisClient, userId, data) {
    const userFound = await redisClient.hGetAll(`${userId}`);
    // TODO: verificar forma melhor de checar se usuraio existe ou não e comparar o que é para de fato atualizar
    // consultar https://redis.io/docs/latest/commands/hgetall/
    if (userFound) {
        userFound.login = data.login ?? userFound.login;
        userFound.name = data.name ?? userFound.name;
        userFound.email = data.email ?? userFound.email;
        userFound.active = data.active ?? userFound.active;
        await redisClient.hSet(`${userId}`, 'login', userFound.login, 'name', userFound.name, 'email', userFound.email, 'active', userFound.active)
    } else {
        // TODO implementar aqui ou no controller erro por não ter localizado o usuario
    }
    return userFound;
}

module.exports = { addUser, getUser, disableUser, updateUser };
