import { CurrentUserDTO } from '../dto';

export type HttpMethod = 'GET' | 'POST' | 'PUT';

export interface Request {
  method: HttpMethod;
  body?: object;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  ignoreCredentials?: boolean;
}

export interface Response<T = object> {
  success: boolean;
  status: number;
  body?: T;
  error?: string;
  message?: string;
}

export interface SignupRequest extends Request {
  method: 'POST';
  body: {
    email: string;
    password: string;
  };
}
export interface SignupResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface LoginRequest extends Request {
  method: 'POST';
  body: {
    email: string;
    password: string;
  };
}
export interface LoginResponse extends Response {
  user: CurrentUserDTO;
  expiry: number;
}

export interface SignoutRequest extends Request {
  method: 'POST';
}
export interface SignoutResponse extends Response {}
