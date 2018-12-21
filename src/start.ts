import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import "reflect-metadata";
import { Container } from "./Container";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const startServer = async (container = new Container()) => {
    const server = new ApolloServer({ typeDefs, resolvers, context: container });

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

    await app.listen({ port: 0 });
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return app;
};
