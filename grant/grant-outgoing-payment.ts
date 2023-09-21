import dotenv from "dotenv";
import { join } from "path";
import { randomUUID } from "crypto";
import { createAuthenticatedClient, isPendingGrant } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;
const QUOTE_URL = process.env.QUOTE_URL;
const QUOTE_ACCESS_TOKEN = process.env.QUOTE_ACCESS_TOKEN;

async function run() {
    const client = await createAuthenticatedClient({
        paymentPointerUrl: PAYMENT_POINTER,
        privateKey: loadPrivateKey(),
        keyId: KEY_ID,
    });

    const paymentPointer = await client.paymentPointer.get({
        url: PAYMENT_POINTER,
    });

    const quote = await client.quote.get({
        url: QUOTE_URL,
        accessToken: QUOTE_ACCESS_TOKEN,
    });

    const grant = await client.grant.request(
        {
            url: paymentPointer.authServer,
        },
        {
            access_token: {
                access: [
                    {
                        identifier: paymentPointer.id,
                        type: "outgoing-payment",
                        actions: ["list", "list-all", "read", "read-all", "create"],
                        limits: {
                            debitAmount: quote.debitAmount,
                            receiveAmount: quote.receiveAmount,
                        },
                    },
                ],
            },
            interact: {
                start: ["redirect"],
                finish: {
                    method: "redirect",
                    uri: "http://localhost:3344",
                    nonce: randomUUID(),
                },
            },
        },
    );

    if (!isPendingGrant(grant)) {
        throw new Error("Expected interactive grant");
    }

    console.log("Please interact at the following URL:", grant.interact.redirect);
    console.log("CONTINUE_ACCESS_TOKEN =", grant.continue.access_token.value);
    console.log("CONTINUE_URI =", grant.continue.uri);
}

run();
