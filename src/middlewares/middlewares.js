
/**
 * Função para validar o formato do userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function validateUserId(req, res, next) {
    const userIdRegex = /^user:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const id = req.body.id;
    if (!userIdRegex.test(id)) {
        return res.status(400).send({ message: "User ID inválido"})
    }
    return next();
}

/**
 * Função que valida o formato do e-mail
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function validateEmail(req, res, next) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = req.body.email;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "E-mail: formato inválido"})
    }
    return next();
}