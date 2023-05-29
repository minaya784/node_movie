const request = require('supertest');
const app = require('../app');
const Genres = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
require('../models');

let movieId;

test('POST /movies should create one movie', async () => {
    const movie = {
        name:"Rupert Grint",
        image:"https://www.google.com.do/url?sa=i&url=https%3A%2F%2Fwww.vanityfair.com%2Fhollywood%2F2023%2F01%2Frupert-grint-found-his-decade-long-harry-potter-stint-to-be-quite-suffocating&psig=AOvVaw2QMXTKpz6To64l0_g2bMBl&ust=1685201007403000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjSjZ-lk_8CFQAAAAAdAAAAABAE",
        synopsis:"Cuatro desconocidos secuestran a una familia en una cabaña aislada. Los captores aseguran que tuvieron la misma premonición: si la familia no sacrifica a uno de sus miembros, el apocalipsis se desatará en forma de tsunamis, pandemia y oscuridad",
        releaseYear:"2023"
    }
    const res = await request(app).post('/movies').send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /movies should return all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);  
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
    expect(res.body[0].genres).toBeDefined();
});

test('PUT /movies/:id should update one movies', async () => {
    const movieUpdated = {
        name:"Dave Bautista",
        image:"https://cloudfront-us-east-1.images.arcpublishing.com/copesa/5XPHND4U2NFCXAN6QGPPOVHCZQ.jpeg",
        synopsis:"Cuatro desconocidos secuestran a una familia en una cabaña aislada. Los captores aseguran que tuvieron la misma premonición: si la familia no sacrifica a uno de sus miembros, el apocalipsis se desatará en forma de tsunamis, pandemia y oscuridad",
        releaseYear:"2023"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send (movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(movieUpdated.firstName);
});

test('POST /movies/:id/actors should set the movies actors', async () => {
    const actor = await Actors.create({
    firstName:"German",
    lastName:"Liriano",
    nationality:"Dominican",
    image:"",
    birthday:"1980-04-18"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('POST /movies/:id/directors should set the movies directors', async () => {
    const director = await Directors.create({
    firstName:"Minaya",
    lastName:"Liriano",
    nationality:"Dominican",
    image:"",
    birthday:"1970-09-25"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('POST /movies/:id/genres should set the movies genre', async () => {
    const genre = await Genres.create({
        name: "Drama"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /movies/:id should delete one movie', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});