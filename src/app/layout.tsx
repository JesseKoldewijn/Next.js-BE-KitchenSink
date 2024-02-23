import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import Background from "@/components/layout/Background";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { THEME_COOKIE } from "@/config/app";
import ThemeProvider, { type Theme } from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/utils/cn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Next.js Backend Kitchen Sink",
  description:
    "Next.js Backend Kitchen Sink - A Next.js project which runs multiple different backend services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieJar = cookies();
  const themeCookie = cookieJar.get(THEME_COOKIE);
  const isTheme =
    themeCookie?.value === "dark" || themeCookie?.value === "light";
  const theme = (
    themeCookie?.value ? (isTheme ? themeCookie?.value : "dark") : "dark"
  ) as Theme;

  return (
    <html lang="en" className={theme}>
      <body className={cn("font-sans", inter.variable)}>
        <TRPCReactProvider>
          <ThemeProvider initialTheme={theme}>
            <Background>
              {children}
              <ThemeToggle />
            </Background>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
