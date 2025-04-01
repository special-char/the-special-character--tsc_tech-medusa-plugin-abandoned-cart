import { CartDTO, CustomerDTO } from "@medusajs/framework/types";

const abandonedCartTemplate = (
  data: CartDTO & { customer: CustomerDTO },
  frontendUrl: string
) => {
  const name =
    `${data?.customer?.first_name || ""} ${
      data?.customer?.last_name || ""
    }`.trim() || data?.customer?.email;
  console.log("frontendUrl", frontendUrl);

  const recoverUrl = `${frontendUrl}/cart/recover/${data.id}`;

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Complete Your Purchase</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000000;
            color: #ffffff;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            font-size: 26px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .item {
            display: flex;
            align-items: center;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        .item img {
            width: 80px;
            height: auto;
            margin-right: 15px;
            border-radius: 5px;
        }
        .item-details {
            text-align: left;
            flex-grow: 1;
        }
        .item-details strong {
            font-size: 18px;
            color: #333;
        }
        .item-details p {
            font-size: 14px;
            color: #777;
            margin: 5px 0;
        }
        .button {
            display: inline-block;
            background-color: #ffffff;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            padding: 12px 20px;
            border-radius: 5px;
            margin-top: 20px;
            transition: background 0.3s ease;
            border: 2px solid #333;
        }
        .button:hover {
            background-color: grey;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Hi ${name}, your cart is waiting! 🛍️</div>
        <p class="message">You left some great items in your cart. Complete your purchase before they're gone!</p>
        
        ${data?.items
          ?.map((item) => {
            return `
            <div class="item">
                <img src=${item.thumbnail} alt=${item.product_title}>
                <div class="item-details">
                    <strong>${item.product_title}</strong>
                    <p>${item.subtitle || ""}</p>
                    <p>Quantity: <strong>${item.quantity}</strong></p>
                    <p>Price: <strong>$${(
                      (item?.unit_price as number) / 100
                    ).toFixed(2)}</strong></p>
                </div>
            </div>`;
          })
          .join("")}
        
        <a href=${recoverUrl} class="button">Return to Cart & Checkout</a>
    </div>
</body>
</html>
`;
};

export default abandonedCartTemplate;
