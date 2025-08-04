import { ReactNode } from "react";
import { ReduxProvider } from "@/utils/ReduxProvider";
import { AuthProvider } from "@/utils/UserProvider";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  );
}
