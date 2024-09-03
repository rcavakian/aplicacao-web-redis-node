const express = require('express');
const userController = require('../controllers/user');
const express = require('express');
const middlewares = require('../middlewares/middlewares');
const router = express.Router()

// TODO implementar middleware para validar o usuario se está vindo no formato
// O middleware serve para previnir acessos indevidos ao banco
// middleware utilizando regex para esperar formato "user:" + uuid.length
router.get("/:id", userController.listUser);

// TODO: implementar middlewares de validação do negócio
router.post("/", userController.createUser);

// TODO: implementar middlewares de validação do negócio
router.put("/:id", userController.updateUser)

// TODO implementar middleware para validar o usuario se está vindo no formato
// O middleware serve para previnir acessos indevidos ao banco
// middleware utilizando regex para esperar formato "user:" + uuid.length
router.delete("/disable/:id", userController.disableUser);

module.exports = router;