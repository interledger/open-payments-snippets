import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: fileURLToPath(join(import.meta.url, "..", "..", ".env")) });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const INCOMING_PAYMENT_URL = process.env.INCOMING_PAYMENT_URL;
const INCOMING_PAYMENT_ACCESS_TOKEN = process.env.INCOMING_PAYMENT_ACCESS_TOKEN;

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const incomingPayment = await client.incomingPayment.get({
    url: INCOMING_PAYMENT_URL,
    accessToken: INCOMING_PAYMENT_ACCESS_TOKEN,
});

console.log("INCOMING PAYMENT:", incomingPayment);
