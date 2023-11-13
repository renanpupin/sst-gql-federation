import {ApolloServer} from '@apollo/server'
import {startServerAndCreateLambdaHandler, handlers} from '@as-integrations/aws-lambda'
import {ApolloGateway, IntrospectAndCompose} from '@apollo/gateway'

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {
                name: 'graph',
                url: process.env.GRAPH_URL
            }
        ]
    })
})

const server = new ApolloServer({
    gateway,
})

export const gqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
)
