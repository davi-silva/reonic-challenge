import app from './app';
import { NODE_ENV, PORT, SERVER_NANE } from '@/constants';

const port = PORT || 5005;

app.listen(port, () => {
  console.log(`${SERVER_NANE} is listening on port: ${port}`);
  console.log(`NODE_ENV=${NODE_ENV}`);
});
