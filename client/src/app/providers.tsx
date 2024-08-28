"use client";

import { UserProvider } from "@/context/authContext";
import { ThemeProvider } from "@material-tailwind/react";

interface ProvidersProps {
  children: any;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
}
