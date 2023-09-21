declare namespace NodeJS {
    export interface ProcessEnv {
        PRIVATE_KEY: string;
        KEY_ID: string;
        PAYMENT_POINTER: string;
        INTERACT_REF: string;
        MANAGE_URL: string;
        CONTINUE_URI: string;
        CONTINUE_ACCESS_TOKEN: string;
        URL_WITH_INTERACT_REF: string;
        INCOMING_PAYMENT_URL: string;
        INCOMING_PAYMENT_ACCESS_TOKEN: string;
        OUTGOING_PAYMENT_URL: string;
        OUTGOING_PAYMENT_ACCESS_TOKEN: string;
        QUOTE_URL: string;
        QUOTE_ACCESS_TOKEN: string;
        ACCESS_TOKEN: string;
    }
}
