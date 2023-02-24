import request from 'supertest';
import app from '../src/app';
import User from '../src/models/User';

describe('Users endpoints', () => {
    let createdUserId: string;

    const testUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
    };

    beforeAll(async () => {
        await User.deleteMany({});
    });

    test('GET / should return an empty array', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST / should create a new user', async () => {
        const response = await request(app)
            .post('/')
            .send(testUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(testUser.name);
        expect(response.body.email).toBe(testUser.email);
        createdUserId = response.body._id;
    });

    test('GET /:id should return the created user', async () => {
        const response = await request(app).get(`/${createdUserId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(testUser.name);
        expect(response.body.email).toBe(testUser.email);
    });

    test('PUT /:id should update the created user', async () => {
        const newName = 'Jane Doe';
        const response = await request(app)
            .put(`/${createdUserId}`)
            .send({ name: newName });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newName);
        expect(response.body.email).toBe(testUser.email);
    });

    test('DELETE /:id should delete the created user', async () => {
        const response = await request(app).delete(`/users/${createdUserId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User deleted');
        const deletedUser = await User.findById(createdUserId);
        expect(deletedUser).toBe(null);
    });
});
