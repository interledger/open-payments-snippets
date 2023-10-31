declare namespace NodeJS {
    export interface ProcessEnv {
        PRIVATE_KEY_PATH: string;
        KEY_ID: string;
        WALLET_ADDRESS: string;
        INTERACT_REF: string;
        MANAGE_URL: string;
        CONTINUE_URI: string;
        CONTINUE_ACCESS_TOKEN: string;
        URL_WITH_INTERACT_REF: string;
        INCOMING_PAYMENT_URL: string;
        INCOMING_PAYMENT_ACCESS_TOKEN: string;
        INCOMING_PAYMENT_ACCESS_TOKEN_MANAGE_URL: string;
        OUTGOING_PAYMENT_URL: string;
        OUTGOING_PAYMENT_ACCESS_TOKEN: string;
        OUTGOING_PAYMENT_ACCESS_TOKEN_MANAGE_URL: string;
        QUOTE_URL: string;
        QUOTE_ACCESS_TOKEN: string;
        QUOTE_ACCESS_TOKEN_MANAGE_URL: string;
        ACCESS_TOKEN: string;
    }
}
