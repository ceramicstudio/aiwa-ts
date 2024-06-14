"use client";
import Head from "next/head";
import styles from "./index.module.css";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { GraphiQL } from "graphiql";
import { useWalletClient } from "wagmi";
import useStore from "@/zustand/store";
import "graphiql/graphiql.min.css";

const Home: NextPage = () => {
  const { compose, setCompose, client } = useStore();
  const [ready, setReady] = useState(false);
  const { data: walletClient } = useWalletClient();

  const query = `
  query Transactions {
    transactionIndex(
      filters: 
      # Uniswap: Universal Router
      {or: [{where: {to: {equalTo: "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad"}}}, 
      # Rhinofi: Bridge on Base
      {or: {where: {to: {equalTo: "0x2f59e9086ec8130e21bd052065a9e6b2497bb102"}}}}]}
      last: 10
    ) {
      edges {
        node {
          id
          nonce
          from
          to
          network
        }
      }
    }
  }
`;

  const Queries = {
    values: [{ query: query }],
  };

  const fetcher = async (graphQLParams: Record<string, unknown>) => {
    const composeClient = compose;

    const data = await composeClient.executeQuery(
      `${graphQLParams.query as string}`,
    );
    console.log(data);

    if (data?.data && !data.data.__schema) {
      return data.data;
    }
  };

  useEffect(() => {
    if (compose) {
      setReady(true);
    }
  }, [compose]);

  return (
    <>
      <Head>
        <title>Save Verifiable Credentials to Ceramic</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-border ">
        <main className=" mx-auto">
          <div className={styles.main}>
            <div style={{ height: "60rem", width: "90%", margin: "auto" }}>
              {ready && (
                <GraphiQL
                  fetcher={fetcher}
                  storage={null}
                  defaultTabs={Queries.values}
                />
              )}
            </div>
            <div className="absolute top-0 -z-10 h-full max-h-full w-full max-w-screen-lg blur-2xl">
              <div className="absolute left-24 top-24 h-56 w-56 animate-blob rounded-full bg-violet-600 opacity-70 mix-blend-multiply blur-3xl filter"></div>
              <div className="absolute bottom-2 right-1/4 hidden h-56 w-56 animate-blob rounded-full bg-sky-600 opacity-70 mix-blend-multiply blur-3xl filter delay-1000 md:block"></div>
              <div className="absolute bottom-1/4 left-1/3 hidden h-56 w-56 animate-blob rounded-full bg-pink-600 opacity-70 mix-blend-multiply blur-3xl filter delay-500 md:block"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
