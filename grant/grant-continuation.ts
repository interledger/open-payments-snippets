import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: fileURLToPath(join(import.meta.url, "..", "..", ".env")) });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const CONTINUE_URI = process.env.CONTINUE_URI;
const CONTINUE_ACCESS_TOKEN = process.env.CONTINUE_ACCESS_TOKEN;
const URL_WITH_INTERACT_REF = process.env.URL_WITH_INTERACT_REF;

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const url = new URL(URL_WITH_INTERACT_REF);
const interactRef = url.searchParams.get("interact_ref");

if (!interactRef) {
    throw new Error(`Missing 'interact_ref'. Received params: ${url.searchParams.toString()} `);
}

const grant = await client.grant.continue(
    {
        accessToken: CONTINUE_ACCESS_TOKEN,
        url: CONTINUE_URI,
    },
    {
        interact_ref: interactRef,
    },
);

console.log(
    "\x1b[34mNote: \x1b[0mIf you requested a grant with the `pnpm grant` script, the following `OUTGOING_PAYMENT_ACCESS_TOKEN` and `OUTGOING_PAYMENT_ACCESS_TOKEN_MANAGE_URL` can be used for Incoming Payments and Quotes as well.\n",
);
console.log("OUTGOING_PAYMENT_ACCESS_TOKEN =", grant.access_token.value);
console.log("OUTGOING_PAYMENT_ACCESS_TOKEN_MANAGE_URL =", grant.access_token.manage);
