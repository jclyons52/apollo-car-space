import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import "reflect-metadata";
import { Container } from "./Container";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const startServer = async (container: Container | null = null): Promise<[express.Express, ApolloServer]> => {
    const context = container || await Container.create();
    const server = new ApolloServer({ typeDefs, resolvers, context });

    const app = express();
    app.use(
        session({
            secret: "asdjlfkaasdfkjlads",
            resave: false,
            saveUninitialized: false,
        }),
    );
    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: "http://localhost:3000",
        },
    });

    return [app, server];
};
