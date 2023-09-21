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

    const incomingPayment = await client.incomingPayment.create(
        {
            paymentPointer: PAYMENT_POINTER,
            accessToken: INCOMING_PAYMENT_ACCESS_TOKEN,
        },
        {
            incomingAmount: {
                value: "1000",
                assetCode: "USD",
                assetScale: 2,
            },
            metadata: {
                description: "data",
            },
            expiresAt: new Date(Date.now() + 60_000 * 10).toISOString(),
        },
    );

    console.log("INCOMING PAYMENT URL =", incomingPayment.id);
}

main();
