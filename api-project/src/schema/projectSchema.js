import { gql } from 'apollo-server-express';

const blogSchema = gql`
  type Project {
    id: ID!
    title: String!
    tagline: String!
    about: String!
    twitterURL: String!
    websiteURL: String!
    facebookURL: String!
    linkedInURL: String!
    images: [String]!
    user: ID!
  }

  # Queries from project service
  type Query {
    # List of all our projects
    allProjects: [Project]
    # A single project
    project(id: ID!): Project
    # A single project
    projectsByAuthorId(authorId: ID!): [Project]
  }

  type Mutation {
    addProject(
      title: String!
      tagline: String!
      about: String
      twitterURL: String
      websiteURL: String
      facebookURL: String
      linkedInURL: String
      images: [String]
      user: ID!
    ): Project
    updateProject(
      id: ID!
      title: String
      tagline: String
      about: String
      twitterURL: String
      websiteURL: String
      facebookURL: String
      linkedInURL: String
      images: [String]
      user: ID!
    ): Project
    deleteProject(id: ID!): String!
    deleteProjectsByAuthorId(user: ID!): String! # delete all projects when the user is deleted
  }
`;

export default blogSchema;
