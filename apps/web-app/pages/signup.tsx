import { SignupForm } from '@/components/SignupForm';
import { Card } from '@/components/ui/card';
import { loginUrl } from '@/utils/constants';
import Head from 'next/head';
import Link from 'next/link';

export default function Signup() {
  return (
    <main className="container flex justify-center py-16">
      <Head>
        <title>Sign up</title>
      </Head>
      <Card className="w-full max-w-[500px] px-8 py-10 flex flex-col gap-y-4">
        <h4>Sign up</h4>
        <SignupForm />
        <p className="mt-1 text-sm text-muted-foreground self-center">
          Already have an account?{' '}
          <Link className="underline" href={loginUrl}>
            Log in
          </Link>
          .
        </p>
      </Card>
    </main>
  );
}
