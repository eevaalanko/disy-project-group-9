import React from 'react'
import ReactDOM from 'react-dom'
import {setContext} from 'apollo-link-context'
import {
    ApolloClient,
    ApolloProvider, createHttpLink,
    InMemoryCache,
    split
} from '@apollo/client'

import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'
import App from "./components/App";

require('dotenv').config();  // doesn't work...
const GRAPHQL_SERVER_URL = "192.168.99.101:4000" // TODO: move to .env file


const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('store-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})

const httpLink = createHttpLink({
    uri: `http://${GRAPHQL_SERVER_URL}/graphql`,
});

const wsLink = new WebSocketLink({
    uri: `ws://${GRAPHQL_SERVER_URL}/graphql`,
    options: {
        reconnect: true
    }
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink),
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
)
