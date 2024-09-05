import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signup } from '@/modules/api/auth';
import useAuthentication from '@/modules/auth/useAuthentication';
import { isValidPassword } from '@starter/shared';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const SignupFormSchema = z.object({
  email: z.string().email({
    message: 'The email address is not valid.'
  }),
  password: z.string().refine(isValidPassword, {
    message: 'The password must be between 8 and 16 characters long.'
  })
});

export function SignupForm() {
  const { setAuthentication } = useAuthentication(false, true);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof SignupFormSchema>) => {
      let signupRes;

      try {
        signupRes = await signup(data.email, data.password);
      } catch (err) {
        toast({
          title: 'Could not sign up.',
          description: (err as AxiosError).message
        });
        return;
      }

      setAuthentication(signupRes.user, signupRes.expiry);
    },
    [setAuthentication, toast]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="darth@vader.space"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
}
