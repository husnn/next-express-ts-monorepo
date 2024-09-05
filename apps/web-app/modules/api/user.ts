import {
  GetUserInfoRequest,
  GetUserInfoResponse
} from '@starter/shared';
import { ApiClient } from '../http';

export const getUserInfo = () =>
  ApiClient().request<GetUserInfoResponse, GetUserInfoRequest>('/user-info', {
    method: 'GET'
  });
