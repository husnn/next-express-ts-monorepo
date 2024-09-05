import { LoginForm } from '@/components/LoginForm';
import { Card } from '@/components/ui/card';
import { signupUrl } from '@/utils/constants';
import Head from 'next/head';
import Link from 'next/link';

export default function Start() {
  return (
    <main className="container flex justify-center py-16">
      <Head>
        <title>Login</title>
      </Head>
      <Card className="w-full max-w-[500px] px-8 py-10 flex flex-col gap-y-4">
        <h4>Welcome back!</h4>
        <LoginForm />
        <p className="mt-1 text-sm text-muted-foreground self-center">
          Don&apos;t have an account?{' '}
          <Link className="underline" href={signupUrl}>
            Sign up
          </Link>
          .
        </p>
      </Card>
    </main>
  );
}
