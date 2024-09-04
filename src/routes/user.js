const express = require('express');
const userController = require('../controllers/user');
const express = require('express');
const middlewares = require('../middlewares/middlewares');
const router = express.Router()

// TODO implementar middleware para validar o usuario se está vindo no formato
// O middleware serve para previnir acessos indevidos ao banco
// middleware utilizando regex para esperar formato "user:" + uuid.length
router.get("/:id", middlewares.validateUserId, userController.listUser);

// TODO: implementar middlewares de validação do negócio
router.post("/", middlewares.validateEmail, userController.createUser);

// TODO: implementar middlewares de validação do negócio
router.put("/update", middlewares.validateUserId, userController.updateUser)

// TODO implementar middleware para validar o usuario se está vindo no formato
// O middleware serve para previnir acessos indevidos ao banco
// middleware utilizando regex para esperar formato "user:" + uuid.length
router.delete("/disable/:id", middlewares.validateUserId, userController.disableUser);

module.exports = router;