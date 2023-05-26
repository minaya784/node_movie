const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test('POST /actors should create one actor', async () => {
    const actor = {
     firstName:"German",
     lastName:"Minaya",
     nationality:"Domi",
     image:"",
     birthday:"1990-03-25"
    }
    const res = await request(app).post('/actors').send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /actors should return all actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);  
});

test('PUT /actors/:id should update one actors', async () => {
    const actorUpdated = {
     firstName:"Germary",
     lastName:"Minaya",
     nationality:"Dominicano",
     image:"",
     birthday:"1990-03-25"
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send (actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id should delete one actor', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});

