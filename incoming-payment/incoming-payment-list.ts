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

//@! start chunk 3 | title=List incoming payments
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
//@! end chunk 3

console.log("INCOMING PAYMENTS:", JSON.stringify(incomingPayments, null, 2));
