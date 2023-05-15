const { getAll, create, getOne, remove, update, setMoviesActors,setMoviesDirectors, setMoviesGenres } = require('../controllers/movies.controllers');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/')
    .get(getAll)
    .post(create);

moviesRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

moviesRouter.route('/:id/actors')
.post(setMoviesActors)

moviesRouter.route('/:id/directors')
.post(setMoviesDirectors)

moviesRouter.route('/:id/genres')
.post(setMoviesGenres)

module.exports = moviesRouter;