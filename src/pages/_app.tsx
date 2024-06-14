import { type AppType } from "next/app";
import { type Session } from "next-auth";
import React from "react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/layout/Footer";
import { Mulish } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";
import { env } from "../env";

const font = Mulish({ subsets: ["latin"] });
const PROJECT_ID = env.NEXT_PUBLIC_PROJECT_ID ?? "";

const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId: PROJECT_ID });

createWeb3Modal({ wagmiConfig, projectId: PROJECT_ID, chains });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <main className={font.className}>
        <Head>
          {/* <link rel="icon" href="/logo.png" /> */}
          {/* <meta property="og:image" content="/logo.png" /> */}
          <meta property="og:type" content="website" />
          {/* <meta name="twitter:image" content="/logo.png" /> */}
        </Head>
        <ThemeProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </main>
    </WagmiConfig>
  );
};

export default MyApp;
