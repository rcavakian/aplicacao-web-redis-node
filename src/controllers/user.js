const service = require("../services/user");

function createUser(req, res) {
  service.createUser(req.body).then(
    (newUser) => {
      return res.status(201).send({
        message: "Novo usuário criado",
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

function listUser(req, res) {
  service.getUser(req.params.id)
    .then((user) => {
      return res.send({ data: user });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
}

function updateUser(req, res) {
  service.updateUser(req.params.id).then(
    (userUpdated) => {
      if (!userUpdated) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      return res.status(201).send({
        message: "Usuário editado com sucesso",
        user: userUpdated,
      });
    },
    (error) => {
      return res.status(500).send({ message: error });
    }
  );
}

function disableUser(req, res) {
  service.disableUser(req.params.id).then(
    (userDisabled) => {
      if (!userDisabled) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      return res.send({
        message: "Usuário desabilitado com sucesso",
        user: userDisabled,
      });
    },
    (error) => {
      return res.status(500).send({
        message: error,
      });
    }
  );
}

module.exports = { createUser, listUser, updateUser, disableUser };
