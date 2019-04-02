import { gql } from 'apollo-server-express';

const relationsSchema = gql`
  extend type User {
    blogs: [Blog]
    projects: [Project]
    profile: Profile
  }

  extend type Blog {
    author: User
  }

  extend type Project {
    author: User
  }

  extend type Profile {
    author: User
  }
`;

export default relationsSchema;
