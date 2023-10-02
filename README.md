# Open Payments Node SDK Snippets

These code snippets are intended for use with [Rafiki Money](https://rafiki.money/). While everyone
is welcome to use these code snippets as a reference, please note that they may need to be adapted
to suit your particular application.

---

### Prerequisites

-   A preferred package manager (`npm`, `pnpm`, `yarn`)
-   An active account on [Rafiki Money](https://rafiki.money/)
-   A payment pointer associated with your account
-   Payment pointer keys should be generated (refer to
    [loading the private key](#loading-the-private-key))

### Setup

Install dependencies:

```sh
# Using NPM
npm install

# Using PNPM
pnpm install

# Using Yarn
yarn
```

### Loading the private key

When generating the keys for a payment pointer on
[Rafiki Money Developer Keys section](https://rafiki.money/settings/developer-keys), the private key
will be automatically downloaded to your machine. Please relocate the `private.key` file to the root
directory of this repository.

Ensure you are at the repository root and execute the following command in your terminal:

```sh
cp .env.example .env
```

Open the newly created `.env` file and fill in the following variables:

-   `PAYMENT_POINTER`
-   `KEY_ID`

Now that you have all the necessary components to initialize the authenticated Open Payments client,
you're ready to begin utilizing the code snippets.

### Running a snippet

From the repository's root you can execute the following scripts using your preferred package
manager:

| Script             | Description                                    |
| ------------------ | ---------------------------------------------- |
| grant              | Request a grant                                |
| grant:continuation | Continuation request for a grant (interactive) |
| grant:ip           | Request a grant for an incoming payment        |
| grant:op           | Request a grant for an outgoing payment        |
| grant:quote        | Request a grant for a quote                    |
| ip:create          | Create an incoming payment                     |
| ip:complete        | Complete an incoming payment                   |
| ip:get             | Retrieve an incoming payment                   |
| ip:list            | List incoming payments                         |
| op:create          | Create an outgoing payment                     |
| op:get             | Retrieve an outgoing payment                   |
| op:list            | List outgoing payments                         |
| quote:create       | Create a quote                                 |
| quote:get          | Retrieve a quote                               |
| pp:get             | Retrieve payment pointer's information         |
| pp:get-keys        | Retrieve payment pointer's JWKs                |
| token:revoke       | Revoke a token                                 |
| token:rotate       | Rotate a token                                 |

Example:

```sh
# Using NPM
npm run grant

# Using PNPM
pnpm grant

# Using Yarn
yarn grant
```

### Examples

-   [Payment flow example](./examples/payment-flow.md)
