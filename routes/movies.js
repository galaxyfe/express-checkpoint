var express = require('express');
var router = express.Router();
const movieData = require('../mock-data/movies.json');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const query = req.query.title;
  if (query) {
    const movieFil = movieData.filter(movie => movie.title == query);
    if (movieFil.length == 0){
      res.sendStatus(404);
    } else {
      res.json(movieFil);
    }
  } else {
    res.json(movieData);
  }
});

router.get('/:id', function(req, res, next) {
  const movieId = req.params.id;
  if(isNaN(movieId)) {
    res.sendStatus(400);
  }
  const movieFil = movieData.filter(movie => movie.id == movieId);
  if(movieFil.length == 0) {
    res.sendStatus(404);
  }
  res.json(movieFil);
})

router.post('/movies', function(req, res, next) {
  const newMovie = req.body;

  fs.writeFileSync('movies.json'.push(newMovie)
})

// router.get('/', function (req, res, next) {
//   const query = req.query.title;
// })

module.exports = router;
 