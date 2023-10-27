import { loadPrivateKey } from "utils/load-private-key";
import { parseTokenArgs } from "utils/parse-token-args";

const KEY_ID = process.env.KEY_ID;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const { ACCESS_TOKEN, MANAGE_URL } = parseTokenArgs(process.argv.slice(2));
const PRIVATE_KEY_PATH = loadPrivateKey();

//@! start chunk 1 | title=Import dependencies
import { createAuthenticatedClient } from "@interledger/open-payments";
//@! end chunk 1

//@! start chunk 2 | title=Initialize Open Payments client
const client = await createAuthenticatedClient({
    walletAddressUrl: WALLET_ADDRESS,
    privateKey: PRIVATE_KEY_PATH,
    keyId: KEY_ID,
});
//@! end chunk 2

//@! start chunk 3 | title=Rotate token
const token = await client.token.rotate({
    url: MANAGE_URL,
    accessToken: ACCESS_TOKEN,
});
//@! end chunk 3

console.log("ACCESS_TOKEN =", token.access_token.value);
console.log("MANAGE_URL =", token.access_token.manage);
