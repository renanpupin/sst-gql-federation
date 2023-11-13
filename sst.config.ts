import { SSTConfig } from "sst";
import { GatewayAPI } from "./stacks/GatewayStack";
import { GraphAPI } from "./stacks/GraphStack";

export default {
  config(_input) {
    return {
      name: "gql-federation",
      region: "sa-east-1",
    };
  },
  stacks(app) {
    app.stack(GraphAPI).stack(GatewayAPI);
  }
} satisfies SSTConfig;
