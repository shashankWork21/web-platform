"use client";

import { logoutUser } from "@/actions";
import { useAuth } from "@/context/authContext";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FaUserCircle } from "react-icons/fa";

export default function LogoutComponent() {
  const { user, setUser } = useAuth();
  const [formState, action] = useFormState(logoutUser, { success: false });

  useEffect(() => {
    if (formState.success) {
      setUser({});
    }
  }, [formState.success, setUser]);

  return (
    <Popover placement="left">
      <PopoverHandler>
        <Button aria-label="Logout" className="mr-5">
          <FaUserCircle className="w-8 h-8" />
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <div className="m-4 flex flex-col items-center space-y-3">
          <Typography className="font-bold text-signal-black">
            Welcome, {user.firstName}
          </Typography>
          <Link
            href={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
            className="text-signal-black hover:border-b-2 hover-border-signal-black"
          >
            Go to Dashboard
          </Link>
          <form action={action}>
            <Button aria-label="Logout" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
