import express from 'express';
import cors from 'cors';

import recommendationRouter from './routers/recommedationRouter.js';

import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/recommendations', recommendationRouter);

app.use(serverMiddlewareError);

export default app;
