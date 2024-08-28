"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Button, Input } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";

import { loginUser } from "@/actions";
import { useAuth } from "@/context/authContext";
import { getGoogleAuthUrlUser } from "@/utils/paths";

export default function LoginForm({ title }: any) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user.email) {
      switch (user.role) {
        case "USER":
          router.push("/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
      }
    }
  }, [user, router]);

  const [formState, action] = useFormState(loginUser, { error: "" });

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <form
        className="w-4/5 md:w-3/5 lg:w-2/5  flex flex-col space-y-5 items-center bg-stone-white-4 px-3 py-8 rounded-xl shadow-lg"
        action={action}
      >
        <h3 className="text-3xl font-semibold">Welcome Back</h3>
        <div className="w-11/12">
          <Input
            crossOrigin=""
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
          />
        </div>
        <div className="w-11/12">
          <Input
            crossOrigin=""
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
          />
        </div>
        {formState.error && (
          <div className="py-3 px-10 text-center bg-red-50 rounded-md  text-red-600">
            {formState.error}
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          className="bg-cypher-blue hover:bg-cypher-blue-4 text-white transition-all duration-300"
        >
          Login
        </Button>
      </form>
      <p className="py-3 text-center font-semibold text-xl">OR</p>
      <Link
        href={getGoogleAuthUrlUser()}
        transition-all
        duration-300
        className="px-10 py-5 bg-signal-black hover:bg-signal-black-6 text-white transition-all duration-300 rounded-xl shadow-lg "
      >
        <div className="flex flex-row space-x-2 items-center justify-center">
          <FaGoogle />
          <p>Login with Google</p>
        </div>
      </Link>
    </div>
  );
}
