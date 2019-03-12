const relationsSchema = `
  extend type User {
    blogs: [Blog]
  }

  extend type Blog {
    author: User
  }
`;

export default relationsSchema;
