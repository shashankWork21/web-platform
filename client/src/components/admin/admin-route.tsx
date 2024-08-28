"use client";

import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import SuperLink from "../general/super-link";

interface AdminRouteChildren {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteChildren) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    let redirectTimeout: any;
    if (!loading) {
      if (user?.role !== "ADMIN") {
        redirectTimeout = setTimeout(() => {
          router.push("/");
        }, 1);
      } else {
        clearTimeout(redirectTimeout);
      }
    }

    return () => {
      if (!!redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [user, loading, router]);

  return (
    <div className="container my-5 mx-auto">
      <div className="flex flex-row items-center justify-start rounded-t-lg border-t border-x border-stone-white-7">
        <SuperLink
          href="/admin/dashboard"
          active={pathname === "/admin/dashboard"}
        >
          Main
        </SuperLink>
        <SuperLink
          active={pathname === "/admin/dashboard/categories"}
          href="/admin/dashboard/categories"
        >
          View Categories
        </SuperLink>
        <SuperLink
          href="/admin/dashboard/categories/new"
          active={pathname === "/admin/dashboard/categories/new"}
        >
          Create Category
        </SuperLink>
        <SuperLink
          href="/admin/dashboard/service-requests"
          active={pathname === "/admin/dashboard/service-requests"}
        >
          View Service Requests
        </SuperLink>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2 p-3 pb-10 rounded-b-lg border border-stone-white-9 ">
        {children}
      </div>
    </div>
  );
}
