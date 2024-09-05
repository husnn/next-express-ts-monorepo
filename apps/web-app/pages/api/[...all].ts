import { isDev } from '@/utils/config';
import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) =>
  isDev
    ? httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_API_URL,
        pathRewrite: [
          {
            patternStr: '^/api',
            replaceStr: ''
          }
        ]
      }).catch((err) => {
        console.log(err);
      })
    : res.status(404).send(null);

export const config = {
  api: { externalResolver: true, bodyParser: false }
};
