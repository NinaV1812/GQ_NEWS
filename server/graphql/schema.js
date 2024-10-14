const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    addUser(userInput: UserInput): User!
  }

  type User {
    _id: ID!
    email: String!
    password: String!
  }

  input UserInput {
    email: String!
    password: String!
  }
`;
module.exports = typeDefs;
