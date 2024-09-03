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

function listUserFromSet(req, res) {
  service
    .getTimeStampFromSet(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não localizado" });
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
}

function deleteUserFromSet(req, res) {
  service.deleteUserFromSet(req.params.id).then(
    (userDeleted) => {
      if (!userDeleted) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      return res.send({
        message: "Usuário removido com sucesso",
        user: userDeleted,
      });
    },
    (error) => {
      return res.status(500).send({
        message: error,
      });
    }
  );
}

module.exports = { listAllUsers, addUsertoSet, updateUserFromSet, listUserFromSet, deleteUserFromSet };