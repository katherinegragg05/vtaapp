import * as dotenv from "dotenv";
dotenv.config();
import gql from "graphql-tag";

//typeDefs define what are the returnable values from the queries
const typeDefs = gql`
  type User {
    _id: ID!
    accountId: String!
    firstName: String!
    lastName: String!
    email: String!
    token: String!
    createdAt: String!
    phoneNumber: String
    addressLine1: String
    addressLine2: String
  }

  input RegisterInput {
    accountId: String!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    acceptedDataPrivacy: Boolean!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(accountemail: String!, password: String!): User!
  }
`;
export default typeDefs;
