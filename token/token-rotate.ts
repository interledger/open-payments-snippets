import dotenv from "dotenv";
import { join } from "path";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const MANAGE_URL = process.env.MANAGE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function run() {
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
}

run();
