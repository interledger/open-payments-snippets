import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const OUTGOING_PAYMENT_ACCESS_TOKEN = process.env.OUTGOING_PAYMENT_ACCESS_TOKEN;
const QUOTE_URL = process.env.QUOTE_URL;
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

//@! start chunk 3 | title=Create outgoing payment
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
//@! end chunk 3

console.log("OUTGOING_PAYMENT_URL = ", outgoingPayment.id);
