import {ApolloServer} from '@apollo/server'
import {startServerAndCreateLambdaHandler, handlers} from '@as-integrations/aws-lambda'
import {buildSubgraphSchema} from '@apollo/subgraph'
import gql from 'graphql-tag'

const typeDefs = gql`
    extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
    type Query {
        hello: String
    }
    type Mutation {
        test(arg: String!): String
    }
`
const resolvers = {
    Query: {
        hello: () => 'query test',
    },
    Mutation: {
        test: (arg: string) => {
            return `mutation test ${arg}`
        }
    }
}


const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers
    })
})

export const gqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler()
)
