import dotenv from "dotenv";
import { join } from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const QUOTE_URL = process.env.QUOTE_URL;
const QUOTE_ACCESS_TOKEN = process.env.QUOTE_ACCESS_TOKEN;
const PRIVATE_KEY_PATH = loadPrivateKey();
const NONCE = randomUUID();

//@! start chunk 1 | title=Import dependencies
import { createAuthenticatedClient, isPendingGrant } from "@interledger/open-payments";
//@! end chunk 1

//@! start chunk 2 | title=Initialize Open Payments client
const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: PRIVATE_KEY_PATH,
    keyId: KEY_ID,
});
//@! end chunk 2

//@! start chunk 3 | title=Get payment pointer information
const paymentPointer = await client.paymentPointer.get({
    url: PAYMENT_POINTER,
});
//@! end chunk 3

const quote = await client.quote.get({
    url: QUOTE_URL,
    accessToken: QUOTE_ACCESS_TOKEN,
});

const DEBIT_AMOUNT = quote.debitAmount;
const RECEIVE_AMOUNT = quote.receiveAmount;

//@! start chunk 4 | title=Request outgoing payment grant
const grant = await client.grant.request(
    {
        url: paymentPointer.authServer,
    },
    {
        access_token: {
            access: [
                {
                    identifier: paymentPointer.id,
                    type: "outgoing-payment",
                    actions: ["list", "list-all", "read", "read-all", "create"],
                    limits: {
                        debitAmount: DEBIT_AMOUNT,
                        receiveAmount: RECEIVE_AMOUNT,
                    },
                },
            ],
        },
        interact: {
            start: ["redirect"],
            finish: {
                method: "redirect",
                uri: "http://localhost:3344",
                nonce: NONCE,
            },
        },
    },
);
//@! end chunk 4

if (!isPendingGrant(grant)) {
    throw new Error("Expected interactive grant");
}

console.log("Please interact at the following URL:", grant.interact.redirect);
console.log("\n");
console.log("CONTINUE_ACCESS_TOKEN =", grant.continue.access_token.value);
console.log("CONTINUE_URI =", grant.continue.uri);
