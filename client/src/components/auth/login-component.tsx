import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function LoginComponent() {
  return (
    <>
      <div className="block md:hidden">
        <Popover placement="bottom-end">
          <PopoverHandler>
            <Button
              aria-label="Login or Register"
              className="mr-5"
              variant="outlined"
            >
              <FaUserCircle className="w-8 h-8" />
            </Button>
          </PopoverHandler>
          <PopoverContent className="p-5">
            <div className="flex flex-col space-y-3 items-center">
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl shadow-lg bg-signal-black hover:bg-signal-black-5 text-white transition-all duration-300"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border-2 border-signal-black rounded-xl hover:border-signal-black-5 hover:bg-signal-black-5 hover:text-white shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="hidden md:block">
        <Popover placement="left">
          <PopoverHandler>
            <Button
              aria-label="Login or Register"
              className="mr-5"
              variant="outlined"
            >
              <FaUserCircle className="w-8 h-8" />
            </Button>
          </PopoverHandler>
          <PopoverContent className="p-5">
            <div className="flex flex-row space-x-3 items-center">
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl shadow-lg bg-signal-black hover:bg-signal-black-5 text-white transition-all duration-300"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border-2 border-signal-black rounded-xl text-signal-black hover:border-signal-black-5 hover:bg-signal-black-5 hover:text-white shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
