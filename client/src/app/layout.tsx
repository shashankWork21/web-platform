import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Algorhythm",
  description:
    "Save your time by automating things that you shouldn't be doing manually!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-light.png",
        href: "/icon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-dark.png",
        href: "/icon-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <div className="min-h-screen text-signal-black bg-gradient-to-br from-white to-stone-white-3">
            {children}
          </div>
          <div id="modal-root" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
