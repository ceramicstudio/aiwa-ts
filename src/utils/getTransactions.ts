import axios from 'axios';
import * as dotenv from 'dotenv';
import {type Transaction} from "@/types/index";
import * as fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Replace with your own Etherscan and Base API keys from the .env file
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? "";
const BASE_API_KEY = process.env.BASE_API_KEY ?? "";
const ETHEREUM_BASE_URL = 'https://api.etherscan.io/api';
const BASE_BASE_URL = 'https://api.basescan.org/api';
const CSV_FILENAME = 'transactions.csv';
const CALLS_PER_SECOND = 5;
const DELAY = 1000 / CALLS_PER_SECOND;

async function getTransactions(address: string, apiKey: string, baseUrl: string, startBlock = 0, endBlock = 99999999, page = 1, offset = 1000): Promise<Transaction[]> {
    const url = `${baseUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data as { status: string, message: string, result: Transaction[] };
        if (data.status === '1') {
            return data.result;
        } else if (data.message === 'No transactions found') {
            return [];
        } else {
            console.error(`Error: ${data.message}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching transactions: ${error as string}`);
        return [];
    }
}

async function getAllTransactions(address: string, apiKey: string, baseUrl: string): Promise<Transaction[]> {
    let allTransactions: Transaction[] = [];
    let page = 1;
    const offset = 1000; // Use a smaller offset to avoid hitting the limit
    while (true) {
        const transactions = await getTransactions(address, apiKey, baseUrl, 0, 99999999, page, offset);
        if (transactions.length === 0) break;
        allTransactions = allTransactions.concat(transactions);
        page++;
        await new Promise(resolve => setTimeout(resolve, DELAY)); // Adding delay to handle rate limit
    }
    return allTransactions;
}

function saveTransactionsToCsv(transactions: Transaction[], filename: string): void {
    const writer = csvWriter({ headers: [
        'blockNumber', 'timeStamp', 'hash', 'nonce', 'blockHash', 'transactionIndex',
        'from', 'to', 'value', 'gas', 'gasPrice', 'isError', 'txreceipt_status',
        'input', 'contractAddress', 'cumulativeGasUsed', 'gasUsed', 'confirmations', 'network'
    ]});
    const stream = fs.createWriteStream(filename);
    writer.pipe(stream);

    transactions.forEach(tx => {
        console.log(tx);
    });

    writer.end();
}

export default async function main(targetAddress: string): Promise<Transaction[]> {
    const ethereumTransactions = await getAllTransactions(targetAddress, ETHERSCAN_API_KEY, ETHEREUM_BASE_URL);
    ethereumTransactions.forEach(tx => {
        tx.network = 'Ethereum';
    });

    const baseTransactions = await getAllTransactions(targetAddress, BASE_API_KEY, BASE_BASE_URL);
    baseTransactions.forEach(tx => {
        tx.network = 'Base';
    });

    const allTransactions = ethereumTransactions.concat(baseTransactions);
    return allTransactions;
    // saveTransactionsToCsv(allTransactions, CSV_FILENAME);
    console.log(`All transactions have been saved to ${CSV_FILENAME}`);
}

// if (process.argv.length !== 3) {
//     console.error('Usage: ts-node script.ts <target_address>');
//     process.exit(1);
// }

// const targetAddress = process.argv[2];
// main(targetAddress).catch(console.error);