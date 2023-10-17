import { type KeyObject, createPrivateKey } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const PRIVATE_KEY_PATH = fileURLToPath(join(import.meta.url, "..", "..", "private.key"));

function checkKey(key: KeyObject): boolean {
    const jwk = key.export({ format: "jwk" });
    return jwk.crv === "Ed25519";
}

export function loadPrivateKey(): KeyObject {
    try {
        const keyFile = readFileSync(PRIVATE_KEY_PATH);
        const key = createPrivateKey(keyFile);

        if (!checkKey(key)) {
            throw new Error("Private key is not EdDSA-Ed25519 key.");
        }

        return key;
    } catch (err) {
        console.log("Error:", err);
        throw new Error(
            "Could not load private key. Please make sure that the `private.key` file is located at the repository root.",
        );
    }
}
