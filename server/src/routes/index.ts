import { Application } from 'express';
import ev from './ev';

export default (app: Application): void => {
  app.use('/ev', ev);
};
