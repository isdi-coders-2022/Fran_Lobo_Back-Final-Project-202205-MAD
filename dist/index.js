import http from 'http';
import { app } from './app.js';
const PORT = process.env.PORT || 3200;
const onError = () => { };
const onListening = () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    console.log('listening on' + bind);
};
app.set('port', PORT);
export const server = http.createServer(app);
server.on('error', onError);
server.on('Listening', onListening);
server.listen(PORT);
