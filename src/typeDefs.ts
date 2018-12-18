import { gql } from 'apollo-server-express'

export const typeDefs = gql`
 scalar Date

  type CarSpace {
      id: Int!
      longitude: Int!
      latitude: Int!
      address: String!
      owner: User!
      bookings: [Booking]
  }

  type User {
      id: Int!
      name: String!
      userName: String!
      email: String!
      password: String!
      carSpaces: [CarSpace]
      bookings: [Booking]
  }

  type Booking {
      id: Int!
      carSpace: CarSpace!
      user: User!
      start: Date!
      end: Date!
  }

  type Query {
      user(id: Int!): User
  }
`;