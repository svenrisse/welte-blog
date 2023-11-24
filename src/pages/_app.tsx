import "~/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "~/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </SessionProvider>

      <ReactQueryDevtools />
    </>
  );
};

export default api.withTRPC(MyApp);
