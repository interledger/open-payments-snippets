import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { createAuthenticatedClient, isPendingGrant } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: fileURLToPath(join(import.meta.url, "..", "..", ".env")) });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const paymentPointer = await client.paymentPointer.get({
    url: PAYMENT_POINTER,
});

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
    },
);

if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
}

console.log("QUOTE_ACCESS_TOKEN =", grant.access_token.value);
console.log("QUOTE_ACCESS_TOKEN_MANAGE_URL = ", grant.access_token.manage);
