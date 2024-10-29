import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div>{children}</div>
      <Toaster />
    </SessionProvider>
  );
};

export default AuthLayout;
