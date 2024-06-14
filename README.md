# Address Interacted With Address (AIWA) on Ceramic
An adaptation of the [AIWA](https://github.com/wbnns/aiwa) tool in TypeScript with storage on Ceramic (using ComposeDB).

A tool that automatically pulls on-chain transaction data given an address input across Ethereum mainnet and Base, and subsequently saving the data to ComposeDB for easy querying and filtering. Also uses Passport to obtain humanity score.

## Dependencies

In order to run this example locally, you will need to create a copy of the [.env.example](.env.example) file in the root of this directory, rename it to `.env`, and begin loading the file with active corresponding values. These include the following:

**ETHERSCAN_API_KEY**

We will be using the [Etherscan API](https://etherscan.io/apis) to pull transaction data from Eth mainnet. Sign up for the free tier and obtain a key if you do not already have one.

**BASE_API_KEY**

We will be using the [Base Explorer API](https://basescan.org/apis) to pull transaction data from Base. Sign up for the free tier and obtain a key if you do not already have one.

**CERAMIC_PRIVATE_KEY**

This is the private key your application will use to instantiate a static key:did in order to write transactions to Ceramic. This DID will act as the identifier for the issuer of points for your application (you).

If you have the [ComposeDB CLI](https://composedb.js.org/docs/0.7.x/api/modules/cli) installed globally, you can run the following command in your terminal to create one:

```bash
composedb did:generate-private-key
```

**PROJECT_ID**

We will be using [WalletConnect's](https://walletconnect.com/) Web3Modal for Web3 authentication.  

You can set up a developer account for free by visiting [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in). Once authenticated, create a new app and copy over the "Project ID" value (found in the dashboard view for that corresponding app).

**GITCOIN_API_KEY** and **SCORER_ID**  

We will be using [Passport Scorer](https://scorer.gitcoin.co/) to determine our input address's humanity score. Set up an API key and a scorer ID in order to use this feature (free tier is available).

## Getting Started

Once you've completed the steps above, you're ready to get started experimenting with the application in developer mode.

First, install your dependencies:

```bash
npm install
```

Once installed, run the application in developer mode:

```bash
npm run dev
```

This action will run the [start script](scripts/run.mjs) which:

1. Automatically generates Ceramic credentials and a ComposeDB configuration
2. Uses our [schema definition](composites/00-types.graphql) to compile and deploy our composite onto our local node (running on local port 7007)
3. Starts up a GraphiQL instance on local port 5002
4. Runs our UI on port 3000

Navigate to http://localhost:3000 in your browser. You'll be able to create an index and query your index on the /reads page based on either the default address, or your address if you wish to connect your wallet.

## Learn More

To learn more about Ceramic please visit the following links

- [Ceramic Documentation](https://developers.ceramic.network/learn/welcome/) - Learn more about the Ceramic Ecosystem.
- [ComposeDB](https://developers.ceramic.network/docs/composedb/getting-started) - Details on how to use and develop with ComposeDB!
- [Off-Chain EAS Attestations](https://docs.attest.sh/docs/tutorials/ceramic-storage) - Create off-chain attestations with EAS while using ComposeDB for storage and querying
- [Data Control Patterns in Decentralized Storage](https://blog.ceramic.network/data-control-patterns-in-decentralized-storage/) - Learn how different teams are taking advantage of various data control patterns in the dStorage space
- [AI Chatbot on ComposeDB](https://learnweb3.io/lessons/build-an-ai-chatbot-on-compose-db-and-the-ceramic-network) - Build an AI-powered Chatbot and save message history to ComposeDB
- [ComposeDB API Sandbox](https://developers.ceramic.network/sandbox) - Test GraphQL queries against a live dataset directly from your browser
- [Ceramic Blog](https://blog.ceramic.network/) - Browse technical tutorials and more on our blog
- [Ceramic Discord](https://discord.com/invite/ceramic) - Join the Ceramic Discord
- [Follow Ceramic on Twitter](https://twitter.com/ceramicnetwork) - Follow us on Twitter for latest announcements!