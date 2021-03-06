import express from 'express';
import './database/connections';
import routes from './routes';
import path from 'path';

const app = express();

app.use(express.json());

app.use(routes);
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..' , 'uploads')))

app.listen(3333)    

