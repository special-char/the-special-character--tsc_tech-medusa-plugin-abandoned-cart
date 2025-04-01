<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Plugin
</h1>


<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
</p>

## Compatibility

This starter is compatible with versions >= 2.4.0 of `@medusajs/medusa`. 

## @tsc_tech/medusa-plugin-abandoned-cart

This plugin automatically sends reminder emails to customers who abandon their carts. It helps recover lost sales by re-engaging potential buyers with personalized follow-ups, discounts, or incentives to complete their purchases. Perfect for boosting conversions and improving customer retention! 🚀


## Installation

To install the `@tsc_tech/medusa-plugin-abandoned-cart`, run the following command:

```
npm install @tsc_tech/medusa-plugin-abandoned-cart
```
or
```
yarn add @tsc_tech/medusa-plugin-abandoned-cart
```


## Configuration

Step 1: Update Medusa Configuration Modify your medusa-config.ts to include the abandoned-cart plugin:

```
module.exports = defineConfig({
  plugins: [
    {
      resolve: "@tsc_tech/medusa-plugin-abandoned-cart",
      options: {},
    },
    ],
})
```

## Usage

Open the storefront at localhost:8000 and choose one of the following options:

Create an account, add items to your cart, and then leave it idle for a minute.

Once the job executes, you will see the following message in the terminal:

```
info:    Sent 1 abandoned cart notifications
```

## Configuration in storefront

To implement the route, in the Next.js Starter Storefront create the file src/app/[countryCode]/(main)/cart/recover/[id]/route.tsx with the following content:

```
import { NextRequest } from "next/server"
import { retrieveCart } from "../../../../../../lib/data/cart"
import { setCartId } from "../../../../../../lib/data/cookies"
import { notFound, redirect } from "next/navigation"
type Params = Promise<{
  id: string
}>

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params
  const cart = await retrieveCart(id)

  if (!cart) {
    return notFound()
  }

  setCartId(id)

  const countryCode = cart.shipping_address?.country_code || 
    cart.region?.countries?.[0]?.iso_2

  redirect(
    `/${countryCode ? `${countryCode}/` : ""}cart`
  )
}
```

Run the storefront login to your account and add products in the cart and you will get an email about the products that were abandoned in the cart.

NOTE: You must have one notification provider configured to send email.

## Contribution

We welcome contributions to improve this plugin! If you have suggestions or find issues, feel free to submit a pull request or open an issue in the repository.