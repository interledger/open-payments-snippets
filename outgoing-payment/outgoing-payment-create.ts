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
const OUTGOING_PAYMENT_ACCESS_TOKEN = process.env.OUTGOING_PAYMENT_ACCESS_TOKEN;
const QUOTE_URL = process.env.QUOTE_URL;

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const outgoingPayment = await client.outgoingPayment.create(
    {
        paymentPointer: PAYMENT_POINTER,
        accessToken: OUTGOING_PAYMENT_ACCESS_TOKEN,
    },
    {
        metadata: {
            description: "data",
        },
        quoteId: QUOTE_URL,
    },
);

console.log("OUTGOING_PAYMENT_URL = ", outgoingPayment.id);
