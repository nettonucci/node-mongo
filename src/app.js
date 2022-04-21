import express from 'express';
import 'dotenv/config';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('[Mongo DB] Connected');
})

const app = express();

app.use(express.json());

routes(app);

export default app;