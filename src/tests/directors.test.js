const request = require('supertest');
const app = require('../app');
require('../models');

let directorId;

test('POST /directors should create one director', async () => {
    const director = {
     firstName:"German",
     lastName:"Minaya",
     nationality:"Domi",
     image:"",
     birthday:"1990-03-25"
    }
    const res = await request(app).post('/directors').send(director);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /directors should return all directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);  
});

test('PUT /directors/:id should update one directors', async () => {
    const directorUpdated = {
     firstName:"Germary",
     lastName:"Minaya",
     nationality:"Dominicano",
     image:"",
     birthday:"1990-03-25"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send (directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id should delete one director', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});

