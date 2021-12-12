const {ApolloServer, gql} = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const socketio = require('socket.io')
const express = require('express');

const Item = require('./models/item')
const User = require('./models/user')
const http = require("http");

const MONGODB_URI = "mongodb://root:example@mongo:27017/"

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
});

// init data
Item.insertMany([{name: 'Item1', amount: 3, price: 1000}, {name: 'Item2', amount: 1, price: 5}], function (err) {
    console.log('Item init failed:', err)
})

const typeDefs = gql`
  type Item {
    name: String
    id: ID!
    price: Int
    amount: Int
  }
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
    allItems: [Item!]!
  }
`

const resolvers = {
    Query: {
        allItems: async () => {
            const items = await Item.find({})
            return items.map(i => ({id: i.id, name: i.name, price: i.price, amount: i.amount}))
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
}

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        cors: true,
        context: async ({req}) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return {currentUser}
            }
        },
    })

    await server.start();

    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    const io = require('socket.io')(httpServer);
    io.on("connection", (socket) => {
        console.log("Connected, socket: ", socket);
        // your code
    });
    const sockets = await io.fetchSockets();
    console.log("test!!!!!!!", sockets[0]); // "alice"

    return { server, app };

}

startApolloServer()



// Todo: implement working socket connection with socket.io when login server is done
