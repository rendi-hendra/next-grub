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
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import { LoginFormSchema, loginFormSchema } from "@/lib/formSchema";
import { signIn } from "next-auth/react";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginFormSchema) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    const errors = response?.code as string;

    if (!errors) {
      setIsLoading(true);
      router.replace("/dashboard");
      setIsLoading(false);
    }

    setError(errors);
    setIsLoading(false);
  };

  // const login = async () => {
  //   await signIn("github", {
  //     redirect: false,
  //     callbackUrl: "/dashboard",
  //   });
  //   toast.success("Login Successful", {
  //     duration: 5000,
  //   });
  // };

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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
              <Button
                className="w-full mt-4"
                type="submit"
                onClick={() =>
                  signIn("github", { redirectTo: "/dashboard" }).then(() =>
                    toast.success("Login Successful", { duration: 5000 })
                  )
                }
              >
                <IoLogoGithub className="mr-3 text-2xl" />
                Sign In with Github
              </Button>
              <Button
                className="w-full mt-4"
                type="submit"
                onClick={() =>
                  signIn("twitter", { redirectTo: "/dashboard" }).then(() =>
                    toast.success("Login Successful", { duration: 5000 })
                  )
                }
              >
                <IoLogoTwitter className="mr-3 text-2xl" />
                Sign In with Twitter
              </Button>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Dont have an account yet?{" "}
                  <Link className="text-black hover:underline" href="/register">
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
