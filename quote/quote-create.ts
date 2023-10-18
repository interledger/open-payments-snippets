import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const INCOMING_PAYMENT_URL = process.env.INCOMING_PAYMENT_URL;
const QUOTE_ACCESS_TOKEN = process.env.QUOTE_ACCESS_TOKEN;

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const quote = await client.quote.create(
    {
        paymentPointer: PAYMENT_POINTER,
        accessToken: QUOTE_ACCESS_TOKEN,
    },
    {
        receiver: INCOMING_PAYMENT_URL,
        // receiveAmount: {
        //     value: "1000",
        //     assetCode: "USD",
        //     assetScale: 2,
        // },
        // debitAmount: {
        //     value: "1000",
        //     assetCode: "USD",
        //     assetScale: 2,
        // },
    },
);

console.log("QUOTE_URL =", quote.id);
