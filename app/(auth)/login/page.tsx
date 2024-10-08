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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginFormSchema, loginFormSchema } from "@/lib/formSchema";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((value) => {
    setIsLoading(true);
    api
      .post("/users/login", {
        username: value.username,
        password: value.password,
      })
      .then((response) => {
        const token = response.data.data.token;
        Cookies.set("token", token);
        router.replace("/dashboard", { scroll: false });
        setIsLoading(false);
        toast.success("Login successfully", {
          duration: 5000,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Login failed", {
          duration: 5000,
        });
        setError(error.response.data.errors);
      });
  });

  return (
    <main>
      <div className="flex h-screen ">
        <div className="lg:flex items-center justify-center flex-1 bg-white text-black flex ">
          <div className="md:w-[30rem] lg:w-[30rem] flex items-center border-2 border-black justify-center rounded-xl mx-5">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Login
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Join to Our Community with all time access and free
              </h1>
              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
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
                      Login
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Dont have an account yet?{" "}
                  <Link className="text-black hover:underline" href="/">
                    Sing Up
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
