"use client";

import { Alert, CreateGrubButton } from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { api } from "@/lib/api";
import EachUtils from "@/lib/EachUtils";
import useStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useEffect } from "react";
// import { useSession } from "next-auth/react";

interface Grub {
  id: number;
  grub_id: string;
  name: string;
  total_users: number;
}

export default function Dashboard() {
  const { count, increase, decrease, data, hello, fetchGrub, sayHello } =
    useStore();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(data);
    fetchGrub();
  }, []);

  return (
    <div>
      <div className="text-center mt-10">
        <p>
          Count: {count} hello: {hello}
        </p>
        <Button onClick={increase} className="my-5">
          Increase
        </Button>
        <Button className="mx-5" onClick={decrease}>
          Decrease
        </Button>
        <Button onClick={sayHello}>Hello</Button>
        <Alert className="mx-5" name="SignOut" click={() => signOut()} />
        <CreateGrubButton name="Create Grub" />
        <div>{JSON.stringify(session?.user)}</div>
        <div className="h-[500px] flex justify-center items-center">
          <div className="flex gap-4">
            <EachUtils
              of={data}
              render={(item: Grub) => {
                return (
                  <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.grub_id}</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                      <p>Name: {item.name}</p>
                      <p>Total Users: {item.total_users}</p>
                    </CardContent>
                  </Card>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
