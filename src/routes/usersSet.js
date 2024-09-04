const express = require('express');
const usersSetController = require ('../controllers/usersSet');
const middlewares = require('../middlewares/middlewares')
const router = express.Router();

// TODO: implementar middleware para validar formayto do usuario
router.get('/:id', usersSetController.listUserFromSet);

router.get('/users', usersSetController.listAllUsers);

router.post('/', usersSetController.addUsertoSet);

router.put('/', usersSetController.updateUserFromSet);

router.delete('/:id', usersSetController.deleteUserFromSet);

 module.exports = router;