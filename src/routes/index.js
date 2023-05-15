const express = require('express');
const genresRouter = require('./genres.router');
const moviesRouter = require('./movies.router');
const actorRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const router = express.Router();

router.use('/genres', genresRouter)
router.use('/actors', actorRouter)
router.use('/directors', directorsRouter)
router.use('/movies', moviesRouter)



module.exports = router;