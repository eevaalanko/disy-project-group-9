const {ApolloServer, gql} = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const express = require('express');

const User = require('./models/user')
const http = require("http");

const MONGODB_URI = "mongodb://root:example@mongo:27017/"

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB with login server!!!')
});

// init data
//User.insertMany([{username: 'Matti', password: 'kissa123'}, {username: 'Mervi', password: 'kissa123'}], function (err) {
//    console.log('User init failed:', err)
//})



const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
  }
`

const resolvers = {
    Query: {
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

    await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "http://127.0.0.1:3000",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        console.log("Connected to login server, socket: ", socket);
        // your code
        socket.data.username = "alice";
    });

    return { server, app };

}

startApolloServer()



// Todo: implement working socket connection with socket.io when login server is done
