"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { WithLoading } from "@/component/utilityLayout/WithLoading";
import { useAppDispatch } from "@/lib/customHook/hook";
import { getCurrentUser } from "@/lib/redux/slices/userSlice";
import { UserLogin } from "@/modules/users/UserLogin";
import { RootState } from "@/utils/types";

export default function LoginPage() {
  const { userinfo, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <WithLoading isLoading={loading}>
        <UserLogin
          name={userinfo?.name || ""}
          email={userinfo?.email || ""}
          isAdmin={userinfo?.isAdmin || false}
        />
      </WithLoading>
    </>
  );
}
