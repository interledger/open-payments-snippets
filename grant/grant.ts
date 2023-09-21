import dotenv from "dotenv";
import { join } from "path";
import { randomUUID } from "crypto";
import { createAuthenticatedClient, isPendingGrant } from "@interledger/open-payments";
import { loadPrivateKey } from "utils/load-private-key";

dotenv.config({ path: join(__dirname, "..", ".env") });

const KEY_ID = process.env.KEY_ID;
const PAYMENT_POINTER = process.env.PAYMENT_POINTER;

async function run() {
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
                        actions: ["read", "read-all", "create"],
                    },
                    {
                        type: "incoming-payment",
                        actions: ["read", "read-all", "list", "list-all", "create", "complete"],
                    },
                    {
                        identifier: PAYMENT_POINTER,
                        type: "outgoing-payment",
                        actions: ["read", "read-all", "list", "list-all", "create"],
                        limits: {
                            debitAmount: {
                                value: "10000",
                                assetCode: "USD",
                                assetScale: 2,
                            },
                            receiveAmount: {
                                value: "10000",
                                assetCode: "USD",
                                assetScale: 2,
                            },
                            // https://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals
                            // interval: "R-1/P1Y2M10DT2H30M/2022-05-11T15:30:00Z",
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

    if (isPendingGrant(grant)) {
        throw new Error("Expected non-interactive grant");
    }

    console.log("CONTINUE_ACCESS_TOKEN =", grant.continue.access_token);
    console.log("CONTINUE_URI =", grant.continue.uri);
}

run();
