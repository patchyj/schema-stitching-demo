import { gql } from 'apollo-server-express';

const user = gql`
  # A user
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    password2: String
    bio1: String
    bio2: String
    bio3: String
    tagline: String
    avatar: String
    linkedInURL: String
    twitterURL: String
    facebookURL: String
    verificationToken: String
    verified: Boolean
  }

  # Queries from user service
  type Query {
    # List of all our users
    allUsers: [User]
    # A single user
    user(id: ID!): User
    privateTest(id: ID!): User
  }

  type Mutation {
    registerUser(
      firstName: String
      lastName: String
      email: String
      password: String
      password2: String
      bio1: String
      bio2: String
      bio3: String
      tagline: String
      avatar: String
      linkedInURL: String
      twitterURL: String
      facebookURL: String
    ): User
    verifyUser(token: String!): User
    loginUser(email: String!, password: String!): String
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
      password2: String
      bio1: String
      bio2: String
      bio3: String
      tagline: String
      avatar: String
      linkedInURL: String
      twitterURL: String
      facebookURL: String
    ): User
    deleteUserRequest: String!
    deleteUser(id: ID!, verificationToken: String!): String
    updatePasswordRequest(email: String!): String
    updatePassword(verificationToken: String!, password: String!, password2: String!): User
  }
`;

export default user;
