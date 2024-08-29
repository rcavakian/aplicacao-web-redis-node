// TODO: Criar estrutura de dados para armazenar uma Sorted Set
import redisClient from "../database/database";

const UsersSet = await redisClient.zset();
