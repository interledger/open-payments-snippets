import dotenv from "dotenv";
import { join } from "path";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const OUTGOING_PAYMENT_ACCESS_TOKEN = process.env.OUTGOING_PAYMENT_ACCESS_TOKEN;
const OUTGOING_PAYMENT_URL = process.env.OUTGOING_PAYMENT_URL;

async function main() {
    const client = await createAuthenticatedClient({
        paymentPointerUrl: PAYMENT_POINTER,
        privateKey: loadPrivateKey(),
        keyId: KEY_ID,
    });

    const outgoingPayment = await client.outgoingPayment.get({
        url: OUTGOING_PAYMENT_URL,
        accessToken: OUTGOING_PAYMENT_ACCESS_TOKEN,
    });

    console.log("OUTGOING PAYMENT:", outgoingPayment);
}

main();
