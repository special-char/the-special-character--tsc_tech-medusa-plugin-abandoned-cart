import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { CartDTO, CustomerDTO } from "@medusajs/framework/types";
import abandonedCartTemplate from "../../../utils/abandonedCartTemplate";
import AbandonedCartService from "../../../modules/abandoned-cart/service";
import { ABANDONED_CART_MODULE } from "../../../modules/abandoned-cart";

type SendAbandonedNotificationsStepInput = {
  carts: (CartDTO & {
    customer: CustomerDTO;
  })[];
};

export const sendAbandonedNotificationsStep = createStep(
  "send-abandoned-notifications",
  async (input: SendAbandonedNotificationsStepInput, { container }) => {
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const abandonedCartService: AbandonedCartService = container.resolve(
      ABANDONED_CART_MODULE
    );

    const cartOptions = await abandonedCartService.getOptions();

    console.log("cartOptions", cartOptions.frontendUrl);

    const notificationData = input.carts.map((cart) => ({
      to: cart.email!,
      channel: "email",
      template: abandonedCartTemplate(cart, cartOptions?.frontendUrl),
    }));

    const notifications = await notificationModuleService.createNotifications(
      notificationData
    );

    return new StepResponse({
      notifications,
    });
  }
);
