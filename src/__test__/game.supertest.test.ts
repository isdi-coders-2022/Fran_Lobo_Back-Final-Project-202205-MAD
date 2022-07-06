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
    beforeEach(async () => {
        data = await initDB();
        //  connect =
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
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get('/game/');
            //.expect(401);
            expect(response.statusCode).toBe(401);
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
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get(
                `/game/${data.games[0].id}`
            );
            expect(response.statusCode).toBe(401);
        });
    });

    describe('POST', () => {
        test('If I am logged, then status should be 201', async () => {
            const newGame: iGame = {
                name: 'Catán',
                description: 'El mejor juego de mesa ',
                url: '',
                image: '',
            };
            const response = await request(app)
                .post('/game/')
                .set('Authorization', 'Bearer ' + token)
                .send(newGame);
            //.expect(200);
            expect(response.statusCode).toBe(201);
        });
    });
});
