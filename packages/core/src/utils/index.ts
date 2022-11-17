import { customAlphabet } from 'nanoid/async';

const alphanumeric =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateUserId = () => customAlphabet(alphanumeric, 16);
