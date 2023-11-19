import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App({ Component, pageProps, session }: any) {
  return (
    <LanguageProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </LanguageProvider>
  );
}
