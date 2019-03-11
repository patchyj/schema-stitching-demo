import { gql } from 'apollo-server';

const post = gql`
  # A post entry
  type Post {
    id: ID!
    title: String
    tagline: String
    body: String
    user: String
  }

  type Identifier {
    # a unique hash to identify the running node process
    hash: String
  }

  # Queries from post service
  type Query {
    # List of all our posts
    allPosts: [Post]
    # A single post
    post(id: ID!): Post
    # A single post
    postsByAuthorId(authorId: ID!): [Post]
    # infos identifying running process
    identifier: Identifier
  }
`;

export default post;
