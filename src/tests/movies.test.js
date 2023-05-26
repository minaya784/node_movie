const request = require('supertest');
const app = require('../app');
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

test('POST /movies/:id/genres should set the artist genres', async () => {
    const genre = await Genre.create({
        name: "R&B"
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