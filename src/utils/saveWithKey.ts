import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from "key-did-resolver";
import { type Transaction } from "@/types/index";
import { fromString } from "uint8arrays/from-string";
import { compose } from "@/composedb/index";

const CERAMIC_PRIVATE_KEY = process.env.CERAMIC_PRIVATE_KEY ?? "";

export const saveData = async (
  data: Transaction[],
  address: string,
) => {
  try {
    if (CERAMIC_PRIVATE_KEY) {
      // create and authenticate new DID instance
      const key = fromString(CERAMIC_PRIVATE_KEY, "base16");
      const provider = new Ed25519Provider(key);
      const staticDid = new DID({
        resolver: KeyResolver.getResolver(),
        provider,
      });
      await staticDid.authenticate();
      compose.setDID(staticDid);
      for (const tx of data) {
        const mutationData = await compose.executeQuery(`
        mutation{
            createTransaction(input: {
            content: {
              address: "${address}"
              blockNumber: "${tx.blockNumber}"
              timeStamp: "${tx.timeStamp}"
              hash: "${tx.hash}"
              nonce: "${tx.nonce}"
              blockHash: "${tx.blockHash}"
              transactionIndex: "${tx.transactionIndex}"
              from: "${tx.from}"
              to: "${tx.to}"
              value: "${tx.value}"
              gas: "${tx.gas}"
              gasPrice: "${tx.gasPrice}"
              isError: "${tx.isError}"
              txreceipt_status: "${tx.txreceipt_status}"
              input: "${tx.input}"
              contractAddress: "${tx.contractAddress}"
              cumulativeGasUsed: "${tx.cumulativeGasUsed}"
              gasUsed: "${tx.gasUsed}"
              confirmations: "${tx.confirmations}"
              network: "${tx.network}"
            }
            })
            {
            document{
              address
              blockNumber
              timeStamp
              hash
              nonce
              blockHash
              transactionIndex
              from
              to
              value
              gas
              gasPrice
              isError
              txreceipt_status
              input
              contractAddress
              cumulativeGasUsed
              gasUsed
              confirmations
              network
            }
          }
        }
     `);
        console.log(mutationData);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
