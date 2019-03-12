import { gql } from 'apollo-server';

const post = gql`
  # A post entry
  type Post {
    id: ID!
    title: String
    tagline: String
    body: String
    user: ID
  }

  # Queries from post service
  type Query {
    # List of all our posts
    allPosts: [Post]
    # A single post
    post(id: ID!): Post
    # A single post
    postsByAuthorId(authorId: ID!): [Post]
  }
`;

export default post;
