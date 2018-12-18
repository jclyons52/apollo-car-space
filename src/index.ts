import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express"
import { ApolloServer } from 'apollo-server-express'
import * as session from "express-session";
import { ResolverFactory } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { User } from "./entity/User";
import { Booking } from "./entity/Booking";
import { CarSpace } from "./entity/CarSpace";



const start = async () => {

    // Construct a schema, using GraphQL schema language
    const connection = await createConnection()
    const resolverFactory = new ResolverFactory(
        connection.getRepository(User),
        connection.getRepository(Booking),
        connection.getRepository(CarSpace),
        )
    const resolvers = resolverFactory.generate()
    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
    app.use(
        session({
            secret: "asdjlfkaasdfkjlads",
            resave: false,
            saveUninitialized: false
        })
    );
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: "http://localhost:3000"
        }
    });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

start()