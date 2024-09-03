const express = require('express');
const usersSetController = require ('../controllers/usersSet');
// const middlewares = require('../middlewares/')
const router = express.Router();

// TODO: implementar middleware para validar formayto do usuario
router.get('/:id', usersSetController.listUserFromSet);

router.get('/users', usersSetController.listAllUsers);

router.post('/:id', usersSetController.addUsertoSet);

router.put('/:id', usersSetController.updateUserFromSet);

router.delete('/:id', usersSetController.deleteUserFromSet);

 module.exports = router;