import { IoLogoGithub } from "react-icons/io5";
import { Button } from "../ui/button";
import { signIn } from "@/auth";
// import { signIn } from "next-auth/react";

// export const GoogleButton = () => {
//   return (
//     <form action="">
//       <Button>
//         <IoLogoGoogle />
//         Sign In with Google
//       </Button>
//     </form>
//   );
// };

export const GithubButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit">
        <IoLogoGithub />
        Sign In with Github
      </Button>
    </form>
  );
};
