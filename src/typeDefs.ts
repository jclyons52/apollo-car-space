import { gql } from "apollo-server-express";
import * as fs from "fs";
import * as path from "path";

const schema = fs.readFileSync(path.resolve(__dirname, "schema.graphql"), "utf8");
export const typeDefs = gql(schema);
