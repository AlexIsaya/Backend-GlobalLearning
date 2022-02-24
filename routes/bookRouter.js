const express = require('express');
const booksController = require('../controllers/bookController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

//validaciones
const bodySchema = Joi.object({
    title: Joi.string().alphanum().required(),
    author: Joi.string().min(3).max(30).required(),
    genre: Joi.string().required(),
    read: Joi.boolean().required()
});

const routes = (Book) => {

    const bookRouter = express.Router();
    //const controller = booksController(Book);   
    //obtenemos esos metodos
    const { getBooks, postBooks, getBookById, putBooks, deleteBookById, getBookByName, getBookByAuthor } = booksController(Book);

    //y vamos llamando a c/u de los metodos:
    //metodo para buscar libros de forma simple
    bookRouter.route('/books')
        .get(getBooks)
        //queremos que valide el esquema del body
        .post(validator.body(bodySchema), postBooks)

    //metodo para buscar por id
    bookRouter.route('/books/:bookId')
        .get(getBookById)
        .put(putBooks)
        .delete(deleteBookById);

    bookRouter.route('/books/:bookName')
        .get(getBookByName);   

    bookRouter.route('/books/:bookAuthor')
        .get(getBookByAuthor);  

    return bookRouter;

}

module.exports = routes;