// TODO: Criar estrutura de dados no js para utilizar o hash no Redis
import redisClient from '../database/database';
import { v4 as uuidv4 } from 'uuid'; // para gerar id unico

class User {
    constructor(login, name, email, active) {
        this.userid =  `user:${uuidv4()}`;
        this.login = login;
        this.name = name;
        this.email = email;
        this.active = active;
    }
}

module.exports = User;