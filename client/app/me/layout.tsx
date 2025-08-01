import { ReactNode } from "react";
import { Metadata } from "next";
import { ReduxProvider } from "@/utils/ReduxProvider";

export const metadata: Metadata = {
  title: "Profile User",
  description: "Profile to your account.",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}