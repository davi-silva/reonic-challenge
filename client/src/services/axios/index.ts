import axios, { AxiosRequestHeaders } from 'axios';

import { SERVER_URI } from '@/constants';

export type { AxiosResponse } from 'axios';

export const fetchGet = async (
  endpoint: string,
  headers?: AxiosRequestHeaders | any
) => {
  try {
    const response = axios.get(SERVER_URI + endpoint, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPost = async (
  endpoint: string,
  body: object,
  headers?: AxiosRequestHeaders | any
) => {
  try {
    const response = axios.post(SERVER_URI + endpoint, body, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};
