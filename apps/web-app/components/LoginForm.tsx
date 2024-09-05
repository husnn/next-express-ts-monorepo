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
import { login } from '@/modules/api/auth';
import useAuthentication from '@/modules/auth/useAuthentication';
import { isValidPassword } from '@starter/shared';
import { useCallback } from 'react';

const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'The email address is not valid.'
  }),
  password: z.string().refine(isValidPassword, {
    message: 'The password must be between 8 and 16 characters long.'
  })
});

export function LoginForm() {
  const { setAuthentication } = useAuthentication(false, true);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof LoginFormSchema>) => {
      login(data.email, data.password)
        .then((res) => {
          setAuthentication(res.user, res.expiry);
        })
        .catch((err) => {
          toast({
            title: 'Could not login.',
            description: err.message
          });
        });
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
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}
