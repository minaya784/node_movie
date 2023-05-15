const { getAll, create, getOne, remove, update } = require('../controllers/directors.controllers');
const express = require('express');

const directorsRouter = express.Router();

directorsRouter.route('/')
    .get(getAll)
    .post(create);

directorsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directorsRouter;