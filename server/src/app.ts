import 'dotenv/config';
import express from 'express';

import middlewareS from '@/middlewares';
import routes from '@/routes';

const app = express();

middlewareS(app);

routes(app);

export default app;
