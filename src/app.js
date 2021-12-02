import express from 'express';
import cors from 'cors';

import recommendationRouter from './routers/recommedationRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(recommendationRouter);

export default app;
