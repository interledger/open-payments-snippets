import dotenv from "dotenv";
import { join } from "path";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const INCOMING_PAYMENT_ACCESS_TOKEN = process.env.INCOMING_PAYMENT_ACCESS_TOKEN;

async function main() {
    const client = await createAuthenticatedClient({
        paymentPointerUrl: PAYMENT_POINTER,
        privateKey: loadPrivateKey(),
        keyId: KEY_ID,
    });

    const incomingPayments = await client.incomingPayment.list(
        {
            paymentPointer: PAYMENT_POINTER,
            accessToken: INCOMING_PAYMENT_ACCESS_TOKEN,
        },
        {
            first: 10,
            last: undefined,
            cursor: undefined,
        },
    );

    console.log("INCOMING PAYMENTS:", JSON.stringify(incomingPayments, null, 2));
}

main();
