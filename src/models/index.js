const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");


Movies.belongsToMany(Actors, {through:'moviesActors'})
Actors.belongsToMany(Movies, {through:'moviesActors'})

Movies.belongsToMany(Directors,{through:'moviesDirectors'})
Directors.belongsToMany(Movies, {through:'moviesDirectors'})

Movies.belongsToMany(Genres, {through:'moviesGenres'}) 
Genres.belongsToMany(Movies, {through:'moviesGenres'})








