import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";
import { parseTokenArgs } from "utils/parse-token-args";

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const { ACCESS_TOKEN, MANAGE_URL } = parseTokenArgs(process.argv.slice(2));

const client = await createAuthenticatedClient({
    paymentPointerUrl: PAYMENT_POINTER,
    privateKey: loadPrivateKey(),
    keyId: KEY_ID,
});

const token = await client.token.rotate({
    url: MANAGE_URL,
    accessToken: ACCESS_TOKEN,
});

console.log("ACCESS_TOKEN =", token.access_token.value);
console.log("MANAGE_URL =", token.access_token.manage);
