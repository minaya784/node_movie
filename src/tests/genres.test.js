const request = require('supertest');
const app = require('../app');
require('../models');

let genresId;

test('POST /genres should create one genres', async () => {
    const genre = {
        name: "Rock"
    }
    const res = await request(app).post('/genres').send(genre);
genresId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /genres should return all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
 
});

test('PUT /genres/:id should update one genres', async () => {
    const genreUpdated = {
        name: "Pop"
    }
    const res = await request(app)
        .put(`/genres/${genresId}`)
        .send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

test('DELETE /genres/:id should delete one genres', async () => {
    const res = await request(app).delete(`/genres/${genresId}`);
    expect(res.status).toBe(204);
});
