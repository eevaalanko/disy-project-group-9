import React from 'react'
import ReactDOM from 'react-dom'
import {setContext} from 'apollo-link-context'
import {
    ApolloClient,
    ApolloProvider, createHttpLink,
    HttpLink,
    InMemoryCache,
    split
} from '@apollo/client'

import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'
import App from "./components/App";

require('dotenv').config();  // doesn't work...
const GRAPHQL_URL = "192.168.99.101:4000/graphql" // TODO: move to .env file


const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('library-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    }
})


const httpLink = createHttpLink({
    uri: `http://192.168.99.101:4000`,
    credentials: 'include'
});

const wsLink = new WebSocketLink({
    uri: `ws://${GRAPHQL_URL}`,
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
    fetchOptions: {
     //   mode: 'no-cors',   // TODO: remove when authorization is set
    },
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
)
