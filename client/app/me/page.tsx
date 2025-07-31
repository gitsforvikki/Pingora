"use client";

import { useAppDispatch } from "@/lib/customHook/hook";
import { getCurrentUser } from "@/lib/redux/slices/userSlice";
import { RootState } from "@/utils/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const { userinfo, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="bg-white min-h-[400px] flex flex-col justify-center items-center">
      <h2 className="text-black text-4xl"> {userinfo?.name}</h2>{" "}
      <h2 className="text-black text-4xl"> {userinfo?.email}</h2>
    </div>
  );
}
