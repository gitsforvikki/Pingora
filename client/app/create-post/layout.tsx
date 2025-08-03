import { Metadata } from "next";
import { ReactNode } from "react";
import { ReduxProvider } from "@/utils/ReduxProvider";

export const metadata: Metadata = {
  title: "create post",
  description: "what is in your mind? Made a post",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}
