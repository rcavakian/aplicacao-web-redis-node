const service = require("../services/usersSet");

function listAllUsers(req, res) {
    service.listAllUsers(req.query)
        .then((users) => {
            return res.send({data: users})
        })
}

function addUsertoSet(req, res) {
  service.addUsertoSet(req.body).then(
    (newUser) => {
      return res.status(201).send({
        message: "Novo usuário adicionado",
        user: newUser,
      });
    },
    (error) => {
      return res.status(500).send({
        message: error,
      });
    }
  );
}

function removeUserFromSet() {

}

function updateUserFromSet(req, res) {
    service.updateUserFromSet(req.params.id).then(
        (userUpdated) => {
            if(!userUpdated) {
                return res.status(404).send({ message: "Usuário não encontrado"})
            }
            return res.status(201).send({
                message: 'Usuario editado com sucesso',
                user: userUpdated,
            });
        },
        (error) => {
            return res.status(500).send({ message: "Usuário não encontrado"});
        }
    );
}

function listUserFromSet() {

}

function deleteUserFromSet() {

}

module.exports = { listAllUsers, addUsertoSet, removeUserFromSet, updateUserFromSet, listUserFromSet, deleteUserFromSet };