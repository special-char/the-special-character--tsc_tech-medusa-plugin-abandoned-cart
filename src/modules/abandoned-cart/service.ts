import { MedusaError, MedusaService } from "@medusajs/framework/utils";

type ModuleOptions = {
  frontendUrl: string;
};

export default class AbandonedCartService {
  private options: ModuleOptions;

  constructor({}, options?: ModuleOptions) {
    this.options = options || { frontendUrl: "http://localhost:8000" };
  }

  static validateOptions(options: Record<any, any>) {
    if (!options.frontendUrl) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `frontendUrl` is required in the plugin's options."
      );
    }
  }

  getOptions() {
    return this.options;
  }
}
