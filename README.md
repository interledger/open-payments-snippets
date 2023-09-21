# Open Payments Snippets

---

README

### Loading the private key

When generating the keys for a payment pointer on
[Rafiki Money](https://rafiki.money/settings/developer-keys), the private key will be automatically
downloaded to your machine. Please relocate the `private.key` file to the root directory of this
repository.

### Boutique's checkout flow

-   Add the private key (:point_up_2:)

-   Ensure you are at the repository root and execute the following command in your terminal:

```sh
cp .env.example .env
```

Open the newly created `.env` file and fill in the following variables:

-   `PAYMENT_POINTER``
-   `KEY_ID``

These variables can be found in the Developer Keys section on Rafiki Money and both of them can be
copied from this section on Rafiki Money.

Now that we have everything we need to initialize the authenticated Open Payments client, we can
perform a checkout flow. Ensure you are at the repository root, then perform the following steps to
execute the checkout flow:

1. Request a Grant for an Incoming Payment

```sh
pnpm grant:ip
```

The script will output an `INCOMING_PAYMENT_ACCESS_TOKEN`. Copy its value and fill the corresponding
variable in your `.env` file.

```sh
# Output example
INCOMING_PAYMENT_ACCESS_TOKEN = 123456ABD...
```

2. Create an Incoming Payment

```sh
pnpm ip:create
```

Copy the `INCOMING_PAYMENT_URL` value and update the corresponding variable in your `.env` file.

3. Request a Grant for Quoting

```sh
pnpm grant:quote
```

Copy the `QUOTE_ACCESS_TOKEN` value and update the corresponding variable in your `.env` file.

4. Create a quote

```sh
pnpm quote:create
```

Copy the `QUOTE_URL` value and update the corresponding variable in your `.env` file.

5. Request a Grant for an Outgoing Payment

```sh
pnpm grant:op
```

This will output three values: The interaction URL, `CONTINUE_ACCESS_TOKEN`, and `CONTINUE_URI`.
Update the `CONTINUE_*` variables in your `.env` file with these values (only
`CONTINUE_ACCESS_TOKEN` and `CONTINUE_URI`).

Note: In Rafiki, this is the only grant that requires user interaction, necessitating two steps to
retrieve an access token with permission to create an outgoing payment.

6. Accepting the Grant

-   Click on the interaction URL outputted in the previous step;
-   Accept or decline the grant on Rafiki Money;
-   After accepting, click the Finish button in the dialog that appears;
-   Copy the redirected URL, it should look something like this:
    `http://localhost:3344/?hash=...&interact_ref=....`
-   Update the `URL_WITH_INTERACT_REF` variable in your `.env` file with this URL

7. Continuation request (notify Rafiki that the user has interacted with the grant)

```sh
pnpm grant:continuation
```

Copy the `OUTGOING_PAYMENT_ACCESS_TOKEN` value and update the corresponding variable in your `.env`
file.

8. Create the Outgoing Payment

```sh
pnpm op:create
```

Copy the `OUTGOING_PAYMENT_URL` value and update the corresponding variable in your `.env` file.

9. Retrieve Outgoing Payment Information (Optional)

```sh
pnpm op:get
```

# TODOS

-   [ ] Enable users to utilize their preferred package manager.
-   [x] Load the key from the repository's root directory.
-   [ ] Include a README with instructions on getting started.

### Running a snippet

_Go through the scripts_:

```json
"scripts": {
    "grant:continuation": "tsx grant/grant-continuation.ts",
    "grant:ip": "tsx grant/grant-incoming-payment.ts",
    "grant:op": "tsx grant/grant-outgoing-payment.ts",
    "grant:quote": "tsx grant/grant-quote.ts",
    "ip:create": "tsx incoming-payment/incoming-payment-create.ts",
    "ip:complete": "tsx incoming-payment/incoming-payment-complete.ts",
    "ip:get": "tsx incoming-payment/incoming-payment-get.ts",
    "ip:list": "tsx incoming-payment/incoming-payment-list.ts",
    "quote:create": "tsx quote/quote-create.ts",
    "quote:get": "tsx quote/quote-get.ts",
    "op:create": "tsx outgoing-payment/outgoing-payment-create.ts",
    "op:get": "tsx outgoing-payment/outgoing-payment-get.ts",
    "op:list": "tsx outgoing-payment/outgoing-payment-list.ts",
    "token:revoke": "tsx token/token-revoke.ts",
    "token:rotate": "tsx token/token-rotate.ts",
    "pp:get": "tsx payment-pointer/payment-pointer-get.ts",
    "pp:get-keys": "tsx payment-pointer/payment-pointer-get-keys.ts"
}
```
