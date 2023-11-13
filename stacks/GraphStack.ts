import { StackContext, Api, EventBus } from "sst/constructs";

export function GraphAPI({ stack }: StackContext) {
  const api = new Api(stack, "graph-api", {
    routes: {
      'GET /': {
        type: 'graphql',
        function: 'packages/graph/graphql.gqlHandler'
      },
      'POST /': {
        type: 'graphql',
        function: 'packages/graph/graphql.gqlHandler'
      }
    },
  });

  stack.addOutputs({
    GraphEndpoint: api.url,
  });

  return {
    api
  }
}
