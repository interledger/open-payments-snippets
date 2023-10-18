import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const INCOMING_PAYMENT_ACCESS_TOKEN = process.env.INCOMING_PAYMENT_ACCESS_TOKEN;
const PRIVATE_KEY_PATH = loadPrivateKey();

//@! start chunk 1 | title=Import dependencies
import { createAuthenticatedClient } from "@interledger/open-payments";
//@! end chunk 1

//@! start chunk 2 | title=Initialize Open Payments client
const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: PRIVATE_KEY_PATH,
    keyId: KEY_ID,
});
//@! end chunk 2

//@! start chunk 3 | title=Create incoming payment
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
//@! end chunk 3

console.log("INCOMING PAYMENT URL =", incomingPayment.id);
