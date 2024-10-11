import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Dashboard() {
  const session = await auth();
  if (!session.user) {
    return null;
  }

  return (
    <div>
      <div className="text-center mt-10">
        <h1 className="mt-10">
          Dashboard {session?.user.name} {session.user.id}
        </h1>
        <Input className="w-96 m-auto my-10" />
        <form
          action={async () => {
            "use server";
            await signOut({
              redirect: true,
              redirectTo: "/login",
            });
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
    </div>
  );
}
