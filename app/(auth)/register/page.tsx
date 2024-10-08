"use client";

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
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { registerFormSchema, RegisterFormSchema } from "@/lib/formSchema";

export default function Register() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((val) => {
    setIsLoading(true);
    api
      .post("/users", {
        name: val.name,
        username: val.username,
        password: val.password,
      })
      .then((response) => {
        console.log(response.data.data);
        setIsLoading(false);
        router.push("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.errors);
      });
  });

  return (
    <main>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex h-screen ">
        <div className="lg:flex items-center justify-center flex-1 bg-white text-black flex ">
          <div className="md:w-[30rem] lg:w-[30rem] flex items-center border-2 border-black justify-center shadow-lg rounded-xl mx-5">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Sign Up
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Join to Our Community with all time access and free
              </h1>
              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-red-500">{error}</p>
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      Sing Up
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Already have an account?{" "}
                  <Link className="text-black hover:underline" href="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
