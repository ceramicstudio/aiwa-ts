import { type RuntimeCompositeDefinition } from "@composedb/types";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from "@composedb/client";
import { definition } from "@/__generated__/definition";

const CERAMIC_URL = process.env.URL ?? "http://localhost:7007";

/**
 * Configure ceramic Client & create context.
 */
const ceramic = new CeramicClient(CERAMIC_URL);

export const compose = new ComposeClient({
  ceramic,
  definition: definition as RuntimeCompositeDefinition,
});

