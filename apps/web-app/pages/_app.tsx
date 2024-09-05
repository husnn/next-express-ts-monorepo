import '@/styles/globals.css';
import { googleAnalyticsId } from '@/utils/config';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/modules/auth/AuthProvider';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable
      )}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      <Toaster />
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </div>
  );
}
