import { StackContext, Api, EventBus, use } from "sst/constructs";
import {GraphAPI} from "./GraphStack";

export function GatewayAPI({ stack }: StackContext) {
  const gqlStackInfo = use(GraphAPI)

  const api = new Api(stack, "gateway-api", {
    cors: true,
    defaults: {
      function: {
        environment: {
          GRAPH_URL: gqlStackInfo.api.url
        },
        nodejs: {
          format: "cjs"
        },
      }
    },
    routes: {
      'GET /': {
        type: 'graphql',
        function: 'packages/gateway/graphql.gqlHandler'
      },
      'POST /': {
        type: 'graphql',
        function: 'packages/gateway/graphql.gqlHandler'
      }
    },
  });

  stack.addOutputs({
    GatewayEndpoint: api.url,
  });
}
