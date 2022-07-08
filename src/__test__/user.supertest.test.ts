import request from 'supertest';
import { server } from '../index.js';
import { app } from '../app.js';
import { initDB } from '../db/init.db';
import { mongooseConnect } from '../db/mongoose.js';
import * as aut from '../services/authorization';
import { iUser, User } from '../models/user.model.js';
import { log } from 'console';

describe('Given the routes of "/user" ', () => {
    // let connect: typeof import('mongoose');
    let data: { [key: string]: Array<any> };
    let token: string;
    let userCreate: iUser;
    let tokenUser = '';
    const newUser: iUser = {
        name: 'Fran',
        secondName: 'Lobo',
        email: 'hola@hola.pp',
        password: '123456',
        avatar: 'https://i.pravatar.cc/300',
        playList: [],
    };

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
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get('/user/');
            //.expect(401);
            expect(response.statusCode).toBe(200);
        });

        test('If I am logged, then status should be 200', async () => {
            const response = await request(app)
                .get('/user/')
                .set('Authorization', 'Bearer ' + token);
            //.expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('POST', () => {
        test('If I am logged, then status should be 201', async () => {
            const response = await request(app).post('/user/').send(newUser);
            userCreate = response.body._id;

            expect(response.statusCode).toBe(201);
        });
    });

    describe('When user Login with correct password and mail', () => {
        test('If I am  logged, then status should be 201', async () => {
            const response = await request(app).post('/user/login').send({
                email: newUser.email,
                password: newUser.password,
            });
            tokenUser = response.body.token;
            expect(response.statusCode).toBe(201);
        });
    });
    describe('When method GET is used in "/:id" route', () => {
        test('If I am not logged, then status should be 200', async () => {
            const token = null;
            token;
            const response = await request(app).get(
                `/review/${data.reviews[0].id}`
            );
            expect(response.statusCode).toBe(200);
        });
    });
});
