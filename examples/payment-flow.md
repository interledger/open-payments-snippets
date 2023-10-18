# Payment flow

Before proceeding with this example, ensure you have met the necessary [prerequisites](../README.md#prerequisites).

In this example, we use `pnpm`, but you can use any package manager to execute the scripts.

1. **Request a Grant for an Incoming Payment**

```sh
pnpm grant:ip
```

The script will output an `INCOMING_PAYMENT_ACCESS_TOKEN`. Copy its value and fill the corresponding variable in your
`.env` file.

```sh
# Output example
INCOMING_PAYMENT_ACCESS_TOKEN = 123456ABD...
```

2. **Create an Incoming Payment**

```sh
pnpm ip:create
```

Copy the `INCOMING_PAYMENT_URL` value and update the corresponding variable in your `.env` file.

3. **Request a Grant for Quoting**

```sh
pnpm grant:quote
```

Copy the `QUOTE_ACCESS_TOKEN` value and update the corresponding variable in your `.env` file.

4. **Create a quote**

```sh
pnpm quote:create
```

Copy the `QUOTE_URL` value and update the corresponding variable in your `.env` file.

5. **Request a Grant for an Outgoing Payment**

```sh
pnpm grant:op
```

This will output three values: The interaction URL, `CONTINUE_ACCESS_TOKEN`, and `CONTINUE_URI`. Update the `CONTINUE_*`
variables in your `.env` file with these values (only `CONTINUE_ACCESS_TOKEN` and `CONTINUE_URI`).

Note: In Rafiki, this is the only grant that requires user interaction, necessitating two steps to retrieve an access
token with permission to create an outgoing payment.

6. **Accepting the Grant**

-   Click on the interaction URL outputted in the previous step;
-   Accept or decline the grant on Rafiki Money;
-   After accepting, click the Finish button in the dialog that appears;
-   Copy the redirected URL, it should look something like this: `http://localhost:3344/?hash=...&interact_ref=....`
-   Update the `URL_WITH_INTERACT_REF` variable in your `.env` file with this URL

7. **Continuation request** (notify Rafiki that the user has interacted with the grant)

```sh
pnpm grant:continuation
```

Copy the `OUTGOING_PAYMENT_ACCESS_TOKEN` value and update the corresponding variable in your `.env` file.

8. **Create the Outgoing Payment**

```sh
pnpm op:create
```

Copy the `OUTGOING_PAYMENT_URL` value and update the corresponding variable in your `.env` file.

9. **Retrieve Outgoing Payment Information** (Optional)

```sh
pnpm op:get
```
