import "reflect-metadata";
import * as express from "express";
import * as session from "express-session";
import { Container } from "./Container";
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { ApolloServer } from "apollo-server-express";

const start = async () => {

    const container = new Container()
    const server = new ApolloServer({ typeDefs, resolvers, context: container });

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