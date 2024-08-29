import redisClient from "../database/database";
const usersSetService = require ('./usersSet');
import { v4 as uuidv4 } from 'uuid'; // para gerar id unico

// Função que cria um novo usuário o campo active será um boolean 
function addUser(redisClient, login, name, email, active) {
    // Criar um número de ID
    const userId = uuidv4();
    // Registrar o momento em que o usuário foi criado
    const timeStamp = Date.now();

    // Criar novo hash para o usuário
    redisClient.hset(`user:${userId}`, 'login', login, 'name', name, 'email', 'active', active);

    // Incluir novo usuário no Sorted Set usersSet
    usersSetService.addUserToSet(redisClient, userId, timeStamp);    
}

// Função que retorna um usuário
function getUser(redisClient, userId) {

}

// Função que lista todos usuários
function getAllUsers (redisClient) {

}

// Função que desativa um usuário
function deleteUser(redisClient, userId, active) {

}

// Função que atualiza um usuário
function updateUser (redisClient, userId, login, name, email, active) {

}

module.exports = { addUser, getUser, getAllUsers, deleteUser, updateUser };
