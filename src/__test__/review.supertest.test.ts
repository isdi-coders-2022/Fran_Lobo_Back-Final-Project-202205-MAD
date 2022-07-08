import request from 'supertest';
import { server } from '../index.js';
import { app } from '../app.js';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose.js';
import * as aut from '../services/authorization';
import { iReview } from '../models/review.model.js';

describe('Given the routes of "/review" ', () => {
    // let connect: typeof import('mongoose');
    let data: { [key: string]: Array<any> };
    let token: string;

    beforeAll(async () => {
        data = await initDB();
    });

    beforeEach(async () => {
        await mongooseConnect();
        token = aut.createToken({
            id: data.users[0].id,
            name: data.users[0].name,
        });
    });

    afterEach(async () => {
        //connect.disconnect();
        server.close();
    });

    describe('When method GET is used', () => {
        test('If I am not logged, then status should be 200', async () => {
            const response = await request(app).get('/review');
            //.expect(401);
            expect(response.statusCode).toBe(200);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get('/review')
                .set('Authorization', 'Bearer ' + token);
            //.expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method GET is used in "/:id" route', () => {});
    describe('POST', () => {
        test('If I am logged, then status should be 201', async () => {
            const newReview: iReview = {
                idUser: data.users[0].id,
                idGame: data.games[0].id,
                text: 'Hola, el juego es la bomba',
            };
            const response = await request(app)
                .post(`/review`)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(newReview);
            //.expect(200);

            console.log('RESPONSE', response);

            expect(response.statusCode).toBe(201);
        });
    });
    describe('When method PATCH is used in "/:id" route', () => {
        test('If I am  logged, then status should be 200', async () => {
            const newReview: Partial<iReview> = {
                text: 'espero que te guste el juego',
                idUser: data.users[0].id,
            };
            const response = await request(app)
                .patch(`/review/${data.reviews[0].id}`)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(newReview);
            expect(response.statusCode).toBe(200);
        });
    });
    describe('DELETE', () => {
        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .delete(`/review/${data.reviews[0].id}`)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send({ idUser: data.users[0].id });

            //.expect(200);

            expect(response.statusCode).toBe(200);
        });
    });
});
