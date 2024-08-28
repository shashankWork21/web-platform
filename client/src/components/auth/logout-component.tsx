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
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FaRegUserCircle } from "react-icons/fa";

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
        <Button className="mr-5">
          <FaRegUserCircle className="w-8 h-8" />
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <div className="m-4 flex flex-col items-center space-y-3">
          <Typography className="font-bold text-signal-black">
            Welcome, {user.firstName}
          </Typography>
          <form action={action}>
            <Button type="submit">Logout</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
