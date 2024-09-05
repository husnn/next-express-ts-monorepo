import { Request, Response } from '@starter/shared';

export default abstract class HttpClient {
  abstract request<
    U extends Response | null = Response,
    T extends Request = Request
  >(endpoint: string, req: T): Promise<U>;
}
