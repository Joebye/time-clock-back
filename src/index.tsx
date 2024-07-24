import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from 'config';
import { users } from './routes/users';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('short'));

app.use('', users);

const port = config.get('server.port');
const server = app.listen(port);
server.on('listening', () => console.log(`server is listening on port ${port}`));