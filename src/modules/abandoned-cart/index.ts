import { Module } from "@medusajs/framework/utils";
import AbandonedCartService from "./service";

export const ABANDONED_CART_MODULE = "abandoned_cart";

export default Module(ABANDONED_CART_MODULE, {
  service: AbandonedCartService,
});
