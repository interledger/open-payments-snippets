import dotenv from "dotenv";
import { join } from "path";
import { createAuthenticatedClient } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const CONTINUE_URI = process.env.CONTINUE_URI;
const CONTINUE_ACCESS_TOKEN = process.env.CONTINUE_ACCESS_TOKEN;

async function run() {
    const client = await createAuthenticatedClient({
        paymentPointerUrl: PAYMENT_POINTER,
        privateKey: loadPrivateKey(),
        keyId: KEY_ID,
    });

    await client.grant.cancel({
        accessToken: CONTINUE_ACCESS_TOKEN,
        url: CONTINUE_URI,
    });

    console.log("Grant revoked.");
}

run();
