import {
  LoginRequest,
  LoginResponse,
  SignoutRequest,
  SignoutResponse,
  SignupRequest,
  SignupResponse
} from '@starter/shared';

import { ApiClient } from '../http';

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
  ApiClient().request<SignoutResponse, SignoutRequest>('/auth/signout', {
    method: 'POST'
  });
