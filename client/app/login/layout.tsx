import { Metadata } from "next";
import { ReactNode } from "react";
import { ReduxProvider } from "@/utils/ReduxProvider";

export const metadata: Metadata = {
  title: "Login User",
  description: "Login to your account.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}
