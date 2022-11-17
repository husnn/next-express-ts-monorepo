import {
  LoginRequest,
  LoginResponse,
  SignoutRequest,
  SignoutResponse,
  SignupRequest,
  SignupResponse
} from '@app/shared';

import { ApiClient } from '../http';
import { AxiosError } from 'axios';
import { removeAuth } from '../auth/utils';

export const signup = (email: string, password: string) =>
  ApiClient().request<SignupResponse, SignupRequest>('/auth/signup', {
    method: 'POST',
    body: {
      email,
      password
    }
  });

export const login = (email: string, password: string) =>
  ApiClient().request<LoginResponse, LoginRequest>('/auth/login', {
    method: 'POST',
    body: {
      email,
      password
    }
  });

export const signout = () =>
  ApiClient()
    .request<SignoutResponse, SignoutRequest>('/auth/signout', {
      method: 'POST'
    })
    .then(removeAuth)
    .catch((err: AxiosError) => {
      if (err.response?.status == 401) removeAuth();
    });
