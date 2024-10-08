// TODO: Criar estrutura de dados no js para utilizar o hash no Redis
import { v4 as uuidv4 } from 'uuid'; // para gerar id unico

class User {
    userId;
    login;
    name;
    email;
    active;

    constructor(login, name, email, active, userId = null) {
        this.userId =  userId ? userId: `user:${uuidv4()}`;
        this.login = login;
        this.name = name;
        this.email = email;
        this.active = active;
    }
}

module.exports = { User };

// scan(`user:*:veiculo`)

// smembers(`users`)

// username:marcosantonio  -> 3 --> hgetall(user:3)