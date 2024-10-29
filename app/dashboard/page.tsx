"use client";

import { Alert, CreateGrubButton } from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import EachUtils from "@/lib/EachUtils";
import useStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";

interface Grub {
  id: number;
  grub_id: string;
  name: string;
  total_users: number;
}

export default function Dashboard() {
  const {
    count,
    increase,
    decrease,
    data,
    hello,
    // fetchGrub,
    sayHello,
    // getAllMembers,
    // session,
    // getSession,
    // members,
  } = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    toast("Event has been created.");
  }, []);

  const logOut = async () => {
    if (session.user.type == "oauth") {
      await api.delete("/users/signout/" + session.user.token, {
        headers: {
          Authorization: session.user.token,
        },
      });
    }

    await signOut();
  };

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
        <div>{JSON.stringify(session?.user)}</div>
        <div className="my-5 flex justify-center">
          <EachUtils
            of={data}
            render={(item: Grub) => {
              return (
                <div
                  key={item.id}
                  className="border border-solid border-black p-10 mx-5 text-left rounded-lg"
                >
                  <p>Grub ID: {item.grub_id}</p>
                  <p>Name: {item.name}</p>
                  <p>Total Users: {item.total_users}</p>
                </div>
              );
            }}
          />
        </div>
        <h1 className="mt-10">
          {/* Dashboard {session?.user.name} {session.user.id} count: {count} */}
        </h1>
        {/* <p>{JSON.stringify(session)}</p> */}
        <Input className="w-96 m-auto my-10" />
        <div>
          <Alert className="mx-5" name="SignOut" click={logOut} />
          <CreateGrubButton name="Create Grub" />
          {/* <Button onClick={logOut} className="mx-5">
            SignOut
          </Button> */}
        </div>
      </div>
    </div>
  );
}
