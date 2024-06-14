import { useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useStore from "@/zustand/store";
import Head from "next/head";
import HomeShowcase from "@/components/ui/home";

declare global {
  interface Window {
    ethereum?: Record<string, unknown> | undefined;
  }
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { address } = useAccount();
  const { compose, setCompose, client } = useStore();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (address) {
      setLoggedIn(true);
      if (walletClient && loggedIn) {
        setCompose(walletClient, compose, client);
      }
    }
  }, [address, walletClient, compose, client, loggedIn, setCompose]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>AIWA</title>
        <meta name="description" content="" />
        <link rel="icon" href="/ceramic-favicon.svg" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
      </Head>
      <div className="border-border ">
        <main className="container mx-auto">
          <div className="relative mx-auto w-full max-w-4xl pt-4 text-center md:mt-24">
            <div className="hidden justify-center md:flex">
              <div className="flex flex-row items-center justify-center gap-5 rounded-md border border-border bg-card/60 p-1 text-xs backdrop-blur-lg"></div>
            </div>
            <h1 className="my-4 text-4xl font-extrabold md:text-7xl md:leading-tight">
              AIWA
            </h1>
            <p className="text-md mx-auto my-4 w-full max-w-xl text-center font-medium leading-relaxed tracking-wide">
              Check if an address interacted with another address as well as its Passport score.
            </p>
            <div className="absolute top-0 -z-10 h-full max-h-full w-full max-w-screen-lg blur-2xl">
              <div className="absolute left-24 top-24 h-56 w-56 animate-blob rounded-full bg-violet-600 opacity-70 mix-blend-multiply blur-3xl filter"></div>
              <div className="absolute bottom-2 right-1/4 hidden h-56 w-56 animate-blob rounded-full bg-sky-600 opacity-70 mix-blend-multiply blur-3xl filter delay-1000 md:block"></div>
              <div className="absolute bottom-1/4 left-1/3 hidden h-56 w-56 animate-blob rounded-full bg-pink-600 opacity-70 mix-blend-multiply blur-3xl filter delay-500 md:block"></div>
            </div>
          </div>
        </main>
      </div>
      <HomeShowcase />
    </div>
  );
}
