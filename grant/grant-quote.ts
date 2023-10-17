import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { loadPrivateKey } from "utils/load-private-key";

//@! start chunk 1 | title=Import dependencies
import {
    createAuthenticatedClient,
    isPendingGrant,
} from "@interledger/open-payments";
//@! end chunk 1

dotenv.config({
    path: fileURLToPath(join(import.meta.url, "..", "..", ".env")),
});

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;

//@! start chunk 2 | title=Initialize Open Payments client
const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});
//@! end chunk 2

//@! start chunk 3 | title=Get payment pointer information
const paymentPointer = await client.paymentPointer.get({
    url: PAYMENT_POINTER,
});
//@! end chunk 3

//@! start chunk 4 | title=Request quote grant
const grant = await client.grant.request(
    {
        url: paymentPointer.authServer,
    },
    {
        access_token: {
            access: [
                {
                    type: "quote",
                    actions: ["create", "read", "read-all"],
                },
            ],
        },
    }
);
//@! end chunk 4

if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
}

console.log("QUOTE_ACCESS_TOKEN =", grant.access_token.value);
console.log("QUOTE_ACCESS_TOKEN_MANAGE_URL = ", grant.access_token.manage);
