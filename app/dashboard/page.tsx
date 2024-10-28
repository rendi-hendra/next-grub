"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EachUtils from "@/lib/EachUtils";
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

// interface Member {
//   id: number;
//   grub_id: string;
//   name: string;
//   total_users: number;
//   users?: [
//     {
//       id: number;
//       name: string;
//       role: string;
//     }
//   ];
// }

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
    session,
    // members,
  } = useStore();
  // const { data: session } = useSession();

  useEffect(() => {
    // Mengambil data saat komponen di-mount
    fetchGrub();
    getAllMembers("fd9e3b09-9835-495d-8794-926afd024bb8");

    // console.log(data);
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
        <div>{session}</div>
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
        <div></div>
        <Button onClick={() => signOut()}>SignOut</Button>
      </div>
    </div>
  );
}
