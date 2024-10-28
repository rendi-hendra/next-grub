import Login from "@/components/auth/form-login";
import { GithubButton } from "@/components/auth/social-button";

const login = () => {
  return (
    <>
      <Login />;
      <GithubButton />
    </>
  );
};

export default login;
