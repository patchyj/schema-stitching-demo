const relationsSchema = `
  extend type User {
    blogs: [Blog]
    profile: Profile
  }

  extend type Blog {
    author: User
  }
`;

export default relationsSchema;
