"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "@/store/store";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
// import { useSession } from "next-auth/react";

interface Grub {
  id: number;
  grub_id: string;
  name: string;
  total_users: number;
}

interface Member {
  id: number;
  grub_id: string;
  name: string;
  total_users: number;
  users?: [
    {
      id: number;
      name: string;
      role: string;
    }
  ];
}

export default function Dashboard() {
  const {
    count,
    increase,
    decrease,
    data,
    hello,
    fetchGrub,
    sayHello,
    getAllMembers,
    members,
  } = useStore();
  // const { data: session } = useSession();

  useEffect(() => {
    // Mengambil data saat komponen di-mount
    fetchGrub();
    getAllMembers("fd9e3b09-9835-495d-8794-926afd024bb8");
  }, []);

  return (
    <div>
      <div className="text-center mt-10">
        <p>
          Count: {count} hello: {hello}
        </p>
        {/* <p className="my-5">{JSON.stringify(data)}</p>
        <p className="my-5">{JSON.stringify(session)}</p> */}
        <p className="my-5">
          {data.map((item: Grub) => {
            return (
              <div key={item.id}>
                <p>Grub ID: {item.grub_id}</p>
                <p>Name: {item.name}</p>
                <p>Total Users: {item.total_users}</p>
              </div>
            );
          })}
        </p>
        <Button onClick={increase}>Increase</Button>
        <Button className="mx-5" onClick={decrease}>
          Decrease
        </Button>
        <Button onClick={sayHello}>Hello</Button>
        <h1 className="mt-10">
          {/* Dashboard {session?.user.name} {session.user.id} count: {count} */}
        </h1>
        {/* <p>{JSON.stringify(session)}</p> */}
        <Input className="w-96 m-auto my-10" />
        <div>
          {members.map((member: Member) => {
            return (
              <div key={member.id}>
                <p>Grub ID: {member.grub_id}</p>
                <p>Name: {member.name}</p>
                <p>Total Users: {member.total_users}</p>
              </div>
            );
          })}
          {/* {members.map((member: Member) => {
            return (
              <div key={member.id}>
                <p>Grub ID: {member.grub_id}</p>
                <p>Name: {member.name}</p>
                <p>Total Users: {member.total_users}</p>
              </div>
            );
          })} */}
        </div>
        <Button onClick={() => signOut()}>SignOut</Button>
        {/* <SignOut /> */}
      </div>
    </div>
  );
}
