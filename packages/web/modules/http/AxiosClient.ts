import { Request, Response } from '@app/shared';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import HttpClient from './HttpClient';

export default class AxiosClient extends HttpClient {
  private axios: AxiosInstance;

  constructor(url?: string) {
    super();
    this.axios = axios.create({ baseURL: url });
  }

  async request<U extends Response | null = Response>(
    endpoint: string,
    req: Request
  ): Promise<U> {
    return this.axios
      .request({
        method: req.method,
        url: endpoint,
        data: req.method === 'POST' || req.method === 'PUT' ? req.body : null,
        params: req.query,
        headers: req.headers,
        withCredentials: !req.ignoreCredentials
      })
      .then((response: AxiosResponse<U>) => {
        return Promise.resolve(response.data);
      })
      .catch((err: AxiosError<U>) => {
        err.message = err.response?.data?.message || err.message;
        return Promise.reject(err);
      });
  }
}
