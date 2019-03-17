import { gql } from 'apollo-server';

const project = gql`
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
  }
`;

export default project;
