import { ReactNode } from "react";
import { ReduxProvider } from "@/utils/ReduxProvider";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
