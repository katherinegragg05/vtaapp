import * as dotenv from "dotenv";
dotenv.config();
import gql from "graphql-tag";

const userTypes = gql`
  type Account @key(fields: "_id") {
    _id: ID!
    name: String
  }

  type CurrentUser {
    id: String
    name: String
    email: String
    avatarUrl: String
  }

  input RegisterInputUser {
    accountId: String
    firstName: String
    lastName: String
    email: String
    password: String
    phoneNumber: String
    addressLine1: String
    addressLine2: String
    verified: Boolean
    verificationEmailSent: Boolean
    acceptedDataPrivacy: Boolean
    addressLine1: String
  }

  input LoginInput {
    accountId: String!
    email: String!
    password: String!
    keepLogin: Boolean!
  }

  type ConfirmationAccount {
    userId: String
    confirmed: Boolean
  }

  extend type Query {
    account(_id: ID!): Account
    accounts: [Account]
    viewer: Account!
    currentUser: CurrentUser!
  }

  extend type Mutation {
    mailLogin(email: String!): String
    confirmLoginToken(email: String!, token: String!): String
    createUser(registerInputUser: RegisterInputUser!): String
    confirmAccount(userId: String!, token: String!): ConfirmationAccount
    loginWithPassword(loginInput: LoginInput!): String
    mailPasswordReset(email: String!): String
    passwordReset(token: String!, userId: String!, newPassword: String!): String
  }
`;

export default userTypes;
