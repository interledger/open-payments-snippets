import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";
import { parseTokenArgs } from "utils/parse-token-args";

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const { ACCESS_TOKEN, MANAGE_URL } = parseTokenArgs(process.argv.slice(2));

async function run() {
    const client = await createAuthenticatedClient({
        paymentPointerUrl: PAYMENT_POINTER,
        privateKey: loadPrivateKey(),
        keyId: KEY_ID,
    });

    await client.token.revoke({
        url: MANAGE_URL,
        accessToken: ACCESS_TOKEN,
    });

    console.log("Token revoked.");
}

run();
