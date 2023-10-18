import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const PRIVATE_KEY_PATH = loadPrivateKey();

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

//@! start chunk 3 | title=get payment pointer information
const paymentPointer = await client.paymentPointer.get({
    url: PAYMENT_POINTER,
});
//@! end chunk 3

//@! start chunk 4 | title=Request incoming payment grant
const grant = await client.grant.request(
    {
        url: paymentPointer.authServer,
    },
    {
        access_token: {
            access: [
                {
                    type: "incoming-payment",
                    actions: ["list", "list-all", "read", "read-all", "complete", "create"],
                },
            ],
        },
    },
);
//@! end chunk 4

if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
}

console.log("INCOMING_PAYMENT_ACCESS_TOKEN =", grant.access_token.value);
console.log("INCOMING_PAYMENT_ACCESS_TOKEN_MANAGE_URL = ", grant.access_token.manage);
