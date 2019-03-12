import makeBlogResolver from './blogResolver';
import makeUserResolver from './userResolver';

const makeResolvers = ({ blogSchema, userSchema }) => {
  const Blog = makeBlogResolver(userSchema);
  const User = makeUserResolver(blogSchema);

  return {
    Blog,
    User
  };
};

export default makeResolvers;
