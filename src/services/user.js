import redisClient from "../database/database";
const usersSetService = require ('./usersSet');
import { v4 as uuidv4 } from 'uuid'; // para gerar id unico
import User from '../models/user';


/**
 * Função que cria um novo usuário e insere no Redis
 * @param {*} redisClient 
 * @param {string} login 
 * @param {string} name 
 * @param {string} email 
 * @param {boolean} active ativo (1) ou inativo (0)
 */
async function addUser(redisClient, User) {
    // Registrar o momento em que o usuário foi criado
    const timeStamp = Date.now();

    // Criar novo hash para o usuário
    await redisClient.hSet(`${User.userId}`, 'login', User.login, 'name', User.name, 'email', User.email, 'active', User.active);

    // Incluir novo usuário no Sorted Set usersSet
    usersSetService.addUserToSet(redisClient, User.userId, timeStamp);    
}

/**
 * Função que retorna um usuário
 * @param {*} redisClient 
 * @param {string} userId 
 */
async function getUser(redisClient, userId) {
    return await redisClient.hGetAll(`user:${userId}`);
}

/**
 * Função que desativa um usuário
 * 
 * @param {*} redisClient 
 * @param {*} userId 
 * @param {boolean} active ativo (1) ou inativo (0)
 */
async function disableUser(redisClient, userId, active) {
    await redisClient.hSet(`user:${userId}`, 'active', active);
}

// Função que atualiza um usuário
function updateUser (redisClient, userId, login, name, email, active) {

}

module.exports = { addUser, getUser, getAllUsers, deleteUser, updateUser };
