import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { RotatingLines } from "react-loader-spinner";
import { type Transaction } from "@/types";

const HomeShowcase: React.FC = () => {
  const [transactionLength, setTransactionLength] = useState<
    number | undefined
  >(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const { address } = useAccount();
  const [tempAddress, setTempAddress] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [pScore, setpScore] = useState<number | undefined>(undefined);

  const createIndex = async () => {
    try {
      setLoading(true);
      const passport = await fetch("/api/passport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address ?? tempAddress }),
      });

      const passportData = (await passport.json()) as {
        score: string;
        status: string;
      };
      if (passportData.status === "DONE") {
        setpScore(Number(passportData.score));
        console.log(passportData);
      }

      const index = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address ?? tempAddress }),
      });
      const indexData = (await index.json()) as Transaction[];

      if (indexData.length) {
        setTransactionLength(indexData.length);
        console.log(indexData);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      setLoggedIn(true);
    } else {
      setTempAddress("0x514E3B94F0287cAf77009039B72C321Ef5F016E6");
    }
  }, [address]);

  return (
    <>
      <section className="relative  border-border bg-gradient-to-b from-background via-background via-90% to-transparent">
        <div className="max-w-xxl max-h-xxl min-h-500 mx-auto w-5/6">
          <div className="mt-5 flex w-full flex-col items-center justify-center">
            {loggedIn && (
              <>
                <p className="mt-5 text-white">Address to index: {address}</p>
                {pScore && (
                  <p className="mt-5 text-white">Passport Score: {pScore}</p>
                )}
                {transactionLength && (
                  <p className="mt-5 text-white">
                    Transaction count: {transactionLength}
                  </p>
                )}
                {loading && (
                  <div className="mt-5">
                    <RotatingLines />
                  </div>
                )}
              </>
            )}
            {!loggedIn && (
              <>
                <p className="mt-5 text-white">
                  Address to index: {tempAddress}
                </p>
                {pScore && (
                  <p className="mt-5 text-white">Passport Score: {pScore}</p>
                )}
                {transactionLength && (
                  <p className="mt-5 text-white">
                    Transaction count: {transactionLength}
                  </p>
                )}
                {loading && (
                  <div className="mt-5">
                    <RotatingLines />
                  </div>
                )}
              </>
            )}
            {!transactionLength && (
              <button
                onClick={async () => await createIndex()}
                className="mr-3 mt-10 h-10 w-1/5 rounded-md text-white outline outline-2 hover:bg-blue-800"
              >
                Create Index
              </button>
            )}
            {transactionLength && (
              <button
                onClick={() => window.open("/reads", "_blank")}
                className="mr-3 mt-10 h-10 w-1/5 rounded-md text-white outline outline-2 hover:bg-blue-800"
              >
                Read Data
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeShowcase;
