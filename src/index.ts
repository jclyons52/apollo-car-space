import { startServer } from "./start";

const [app, server] = startServer();

app.listen({ port: 4000 });
// tslint:disable-next-line:no-console
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
