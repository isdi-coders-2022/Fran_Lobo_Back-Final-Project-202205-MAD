import * as aut from '../services/authorization.js';
export class UserController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAll = async (req, resp, next) => {
        resp.setHeader('Content-Type', 'application/json');
        const user = await this.model.find();
        resp.end(JSON.stringify(user));
    };
    getById = async (req, resp, next) => {
        resp.setHeader('Content-Type', 'application/json');
        const result = await this.model
            .findById(req.params.id)
            .populate('playList');
        if (result === null) {
            resp.status(404);
            resp.end('No user found');
        }
        else {
            resp.end(JSON.stringify(result));
        }
    };
    registerUser = async (req, resp, next) => {
        let newItem;
        try {
            req.body.password = await aut.encrypt(req.body.password);
            newItem = await this.model.create(req.body);
        }
        catch (error) {
            console.log('ERROR EN REGISTER USER:', error);
            next(error);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newItem));
    };
    patch = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedItem === null) {
                resp.status(404);
                resp.end('No user found');
            }
            else {
                resp.end(JSON.stringify(updatedItem));
            }
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        const deletedItem = await this.model.findByIdAndDelete(req.params.id);
        if (deletedItem === null) {
            resp.status(400);
            resp.end(`User not found`);
        }
        else {
            resp.end(JSON.stringify({ _id: deletedItem._id }));
        }
    };
    loginController = async (req, resp, next) => {
        const findUser = await this.model.findOne({
            email: req.body.email,
        });
        if (!findUser ||
            !(await aut.compare(req.body.password, findUser.password))) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayLoad = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
        };
        const token = aut.createToken(tokenPayLoad);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify({ token, id: findUser.id }));
    };
}
