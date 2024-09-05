import useAuthentication from '@/modules/auth/useAuthentication';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Index() {
  const { currentUser, signoutAndClear, fetchUserInfo } =
    useAuthentication(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <main className="container flex flex-col gap-y-4 pb-10">
      <Head>
        <title>Starter Template</title>
      </Head>
    </main>
  );
}
