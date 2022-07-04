export class GameController {
    model;
    constructor(model) {
        this.model = model;
    }
    getAll = async (req, resp, next) => {
        console.log('hola');
        resp.setHeader('Content-Type', 'application/json');
        try {
            resp.end(JSON.stringify(await this.model.find()));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, resp, next) => {
        resp.setHeader('Content-Type', 'application/json');
        try {
            const result = await this.model.findById(req.params.id);
            if (result === null) {
                resp.status(404);
                resp.end('No object found');
            }
            resp.end(JSON.stringify(result));
        }
        catch (error) {
            next(error);
        }
    };
    post = async (req, resp, next) => {
        console.log(req.body);
        console.log('post');
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);
        try {
            const newItem = await this.model.create(req.body);
            // resp.end(JSON.stringify( newItem));
            resp.end(JSON.stringify(req.body));
        }
        catch (error) {
            next(error);
        }
    };
    patch = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const newItem = await this.model.findByIdAndUpdate(req.params.id, req.body);
            resp.end(JSON.stringify(req.body));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const deletedItem = await this.model.findByIdAndDelete(req.params.id);
            if (deletedItem === null) {
                resp.status(400);
                resp.end(`Object not found`);
            }
            else {
                resp.end(JSON.stringify({ _id: deletedItem._id }));
            }
        }
        catch (error) {
            next(error);
        }
    };
}
