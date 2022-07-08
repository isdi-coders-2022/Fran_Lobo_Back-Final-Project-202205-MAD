import request from 'supertest';
import { server } from '../index.js';
import { app } from '../app.js';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose.js';
import * as aut from '../services/authorization';
import { iGame } from '../models/game.model.js';

describe('Given the routes of "/game" ', () => {
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
            const response = await request(app).get('/game/');
            //.expect(401);
            expect(response.statusCode).toBe(200);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get('/game/')
                .set('Authorization', 'Bearer ' + token);
            //.expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When method GET is used in "/:id" route', () => {
        test('If I am not logged, then status should be 200', async () => {
            const token = null;
            token;
            const response = await request(app).get(
                `/game/${data.games[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });
        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get('/game/')
                .set('Authorization', 'Bearer ' + token);
            //.expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('POST', () => {
        test('If I am logged, then status should be 201', async () => {
            const newGame: iGame = {
                name: 'CatánTesting',
                description: 'El mejor juego de mesa ',
                url: 'ere',
                image: 'ertert',
            };
            const response = await request(app)
                .post('/game')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(newGame);
            //.expect(200);

            expect(response.statusCode).toBe(201);
        });
    });
    describe('PATCH', () => {
        test('If I am logged, then status should be 200', async () => {
            const newGame: Partial<iGame> = {
                // name: 'CatánTesting',
                // description: 'El mejor juego de mesa ',
                url: 'ereded',
                // image: 'ertert',
            };
            const response = await request(app)
                .patch(`/game/${data.games[0].id}`)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(newGame);
            //.expect(200);

            expect(response.statusCode).toBe(200);
        });
    });
    describe('DELETE', () => {
        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .delete(`/game/${data.games[0].id}`)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json');

            //.expect(200);

            expect(response.statusCode).toBe(200);
        });
    });
});
