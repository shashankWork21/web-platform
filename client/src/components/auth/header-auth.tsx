"use client";

import { useAuth } from "@/context/authContext";
import LoginComponent from "./login-component";
import LogoutComponent from "./logout-component";

export default function HeaderAuth() {
  const { user, loading } = useAuth();

  const authContent = user.email ? <LogoutComponent /> : <LoginComponent />;

  if (loading) {
    return;
  }
  return authContent;
}
