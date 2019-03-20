import { gql } from 'apollo-server-express';

const user = gql`
  # A user
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  # Queries from user service
  type Query {
    # List of all our users
    allUsers: [User]
    # A single user
    user(id: ID!): User
  }

  type Mutation {
    addUser(
      firstName: String
      lastName: String
      email: String
      password: String
      password2: String
    ): User
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    deleteUser(id: ID!): String
  }
`;

export default user;
