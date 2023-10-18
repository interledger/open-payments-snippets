import { loadPrivateKey } from "utils/load-private-key";
import { parseTokenArgs } from "utils/parse-token-args";

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const { ACCESS_TOKEN, MANAGE_URL } = parseTokenArgs(process.argv.slice(2));
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

//@! start chunk 3 | title=Revoke token
await client.token.revoke({
    url: MANAGE_URL,
    accessToken: ACCESS_TOKEN,
});
//@! end chunk 3

console.log("Token revoked.");
