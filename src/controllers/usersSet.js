const service = require("../services/usersSet");

function listAllUsers(req, res) {
    service.listAllUsers(req.query)
        .then((users) => {
            return res.send({data: users})
        })
}

function addUsertoSet() {

}

function removeUserFromSet() {

}

function updateUserFromSet() {

}

function listUserFromSet() {

}

function deleteUserFromSet() {

}

module.exports = { listAllUsers, addUsertoSet, removeUserFromSet, updateUserFromSet, listUserFromSet, deleteUserFromSet };