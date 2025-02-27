import { CorsOptions } from 'cors';

import { CLIENT } from '@/constants';

const corsOptions: CorsOptions = {
  origin: [CLIENT] as string[],
};

export default corsOptions;
