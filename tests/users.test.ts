import request from 'supertest';
import app from '../src/app';
import { connectToDatabase } from '../src/database';

// antes de correr los tests, conectamos a la base de datos
beforeAll(async () => {
    await connectToDatabase();

    await describe('GET /users', () => {        
        it('debería devolver un array de usuarios', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});

