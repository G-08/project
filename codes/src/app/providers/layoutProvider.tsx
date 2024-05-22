'use client'
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { message, Popover } from "antd";
import { useRouter } from "next/navigation";
import { SetCurrentUser } from "@/app/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const isPrivatePage =
    pathname !== "/login" && pathname !== "/register";
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/getUserData");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    if (isPrivatePage) {
      getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrivatePage, pathname]);



  const onLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      message.success("Logout successfully");
      dispatch(SetCurrentUser(null));
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  const content = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => router.push("/profile")}
      >
        <i className="ri-shield-user-line"></i>
        <span>Profile</span>
      </div>

      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => onLogout()}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </div>
    </div>
  );

  return (
    <div>
      {isPrivatePage && currentUser && (
        <>
          <div className="p-5">{children}</div>
        </>
      )}

      {!isPrivatePage && children}
    </div>
  );
}

export default LayoutProvider;
