import { startServer } from "./start";

startServer().then(([app, server]) => {
    app.listen({ port: 4000 });
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
