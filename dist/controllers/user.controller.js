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
        const result = await this.model.findById(req.params.id);
        if (result === null) {
            resp.status(404);
            resp.end('No user found');
        }
        resp.end(JSON.stringify(result));
    };
    post = async (req, resp, next) => {
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);
        try {
            const newItem = await this.model.create(req.body);
            resp.end(JSON.stringify(req.body));
        }
        catch (error) {
            next(error);
        }
    };
    patch = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedItem === null) {
                resp.status(404);
                resp.end('No user found');
            }
            resp.end(JSON.stringify(updatedItem));
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
}
