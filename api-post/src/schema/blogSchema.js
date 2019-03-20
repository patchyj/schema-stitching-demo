import { gql } from 'apollo-server';

const blog = gql`
  # A blog entry
  type Blog {
    id: ID!
    title: String
    tagline: String
    body: String
    user: ID
  }

  # Queries from blog service
  type Query {
    # List of all our blogs
    allBlogs: [Blog]
    # A single blog
    blog(id: ID!): Blog
    # A single blog
    blogsByAuthorId(authorId: ID!): [Blog]
  }

  type Mutation {
    addBlog(title: String, tagline: String, body: String, user: ID): Blog
    updateBlog(
      id: ID!
      title: String
      tagline: String
      body: String
      user: ID
    ): Blog
    deleteBlog(id: ID!): String!
  }
`;

export default blog;
