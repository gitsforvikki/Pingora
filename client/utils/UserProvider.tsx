"use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/lib/customHook/hook";
import { getCurrentUser } from "@/lib/redux/slices/userSlice";
import { isLoggedIn } from "./AuthUtil";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getCurrentUser());
    } else {
      dispatch({ type: getCurrentUser.rejected.type, payload: null });
    }
  }, [dispatch]);

  return <>{children}</>;
}
