
export type Post = {
  body: string;
  id: string;
  to: string;
  created: string;
  ciphertext: string;
  chain: string;
  accessControlConditions: string;
  accessControlConditionType: string;
  author: {
    id: string
  }
};

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  network?: string;
}

export interface Error {
  error: string;
}

export interface Message extends Post {
  text: string;
  sentBy: string;
  sentAt: Date;
  isChatOwner?: boolean;
}

export interface TrustType {
  scope: string;
  level: string;
  reason?: string[];
};

export interface ConvertedType {
  scope: string;
  level: number;
  reason?: string[];
};

export interface FooterLink {
  href: string;
  label: string;
};
