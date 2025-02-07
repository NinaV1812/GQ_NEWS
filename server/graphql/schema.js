const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query{
    user(id:ID!):User!
  }

  type Mutation {
    signUp(fields: AuthInput!):User!
    authUser(fields: AuthInput!):User!
  }

  type User {
    _id:ID!
    email:String!
    password:String
    name:String
    lastname:String
    token:String
  }

  input AuthInput {
    email:String!
    password:String!
  }
`;

module.exports = typeDefs;
