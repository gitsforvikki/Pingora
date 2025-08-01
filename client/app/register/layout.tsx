import { ReactNode } from "react";
import { Metadata } from "next";
import { ReduxProvider } from "@/utils/ReduxProvider";

export const metadata: Metadata = {
  title: "Register User",
  description: "Register to your account.",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}
