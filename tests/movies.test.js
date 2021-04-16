



const e = require('express');
const app = require('../app')
const request = require('supertest')(app)


describe('the /movies path', () => {

    test("GET /movies", done => {
        request.get('/movies')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.length).toEqual(3);
                done();
            });
    });

    test("GET the second movie", done => {
        const movieId = 2;
        request.get(`/movies/${movieId}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body[0].id).toEqual(movieId);
                done();
            });
    });

    test("GET 404 when the movie is not found", done => {
        request.get('/movies/11')
            .expect(404, done);
    });

    test("GET 400 when the movie passed is not a number", done => {
        request.get('/movies/pulpfiction')
            .expect(400, done);
    });

    test("GET the second movie by query with title", done => {
        const movieTitle = "Titanic";
        request.get(`/movies/?title=${movieTitle}`)
            .expect(200)
            .end(function (err, res) {
                expect(res.body[0].title).toEqual(movieTitle);
                done();
            });
    });

    test("GET 404 when query with title returns nothing", done => {
        const movieTitle = "Flesh + Blood";
        request.get(`/movies/?title=${movieTitle}`)
            .expect(404, done);
    });

    test("POST additional movie to the database", done => {
        request.post('/movies')
            .send(
                {
                    "title": "From Paris With Love",
                    "runtime": 94,
                    "release_year": 2010,
                    "director": "Pierre Morel",
                    },)
            .end(function (err, res) {
                expect(res.body.length).toEqual(4);
                expect(200, done);
            });
    });
});