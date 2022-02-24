const express = require('express');
const usersController = require('../controllers/userController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const bodySchema = Joi.object({
    firstName:Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required().alphanum().max(30),
    password: Joi.string().required().min(6).max(10),
    email: Joi.string().required().email(),
    adress: Joi.string().required(),
    phone: Joi.number().required(),
})

const routes = (User) => {

    const userRouter = express.Router();
 
    //obtenemos esos metodos, desestructuración
    const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, validateToken, getUserByName } = usersController(User);

    //y vamos llamando a c/u de los metodos:
    userRouter.route('/users')
        .get(getUsers)
        .post(postUsers)
        .post(validator.body(bodySchema), postUsers);

    userRouter.route('/users/:userId')
        .get(getUserById)
        .put(putUsers)
        .delete(deleteUserById)
        .get(getUserByName)

    userRouter.route('/users/login')
        .post(postLogin)

    userRouter.route('/users/login/validate')
        .get(validateToken)

    return userRouter;

}

module.exports = routes;