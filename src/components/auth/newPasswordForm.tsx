"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CardWrapper from "@/components/auth/cardWrapper";
import { FormError } from "@/components/formError";
import { FormSuccess } from "@/components/formSuccess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newPasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { newPasssword } from "@/actions/new-password";
import { Checkbox } from "@/components/ui/checkbox";

const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const token = searchParams.get("token");

  if (!token) return notFound();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      newPasssword(values, token).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          form.reset();
        }
      });
    });
  };
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Create new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex items-center">
        <Checkbox
          id="showPassword"
          onCheckedChange={(value) => {
            setShowPassword(Boolean(value));
          }}
        />
        <label htmlFor="showPassword" className="ml-2">
          Show Password
        </label>
      </div>
    </CardWrapper>
  );
};

export default NewPasswordForm;
