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
    addUser(
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
    deleteUser(id: ID!): String
    updatePassword(id: ID!, password: String!, password2: String!): String
  }
`;

export default user;
