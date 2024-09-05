export const env = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV;
export const isDev = env === 'development';
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
