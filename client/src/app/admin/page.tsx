import { getGoogleAuthUrlAdmin } from "@/utils/paths";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function AdminLogin() {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 mt-10 flex flex-col space-y-5 items-center bg-stone-white-3 px-3 py-8 rounded-xl shadow-lg">
        <h3 className="text-3xl font-semibold">Welcome, Admin!</h3>
        <Link
          href={getGoogleAuthUrlAdmin()}
          className="px-10 py-5 bg-signal-black hover:bg-signal-black-5 text-white text-lg transition-all duration-300 rounded-xl shadow-xl"
        >
          <div className="flex flex-row space-x-2 items-center justify-center">
            <FaGoogle />
            <p>Login with Google</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
