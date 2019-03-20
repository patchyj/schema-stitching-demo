import { merge } from 'lodash';
// import our resolvers
import blogResolver from './blogResolver';

// fake another resolver
const rootResolvers = {};

// Merge all of the resolver objects together, just to show how
const resolvers = merge(rootResolvers, blogResolver);

// export all resolvers
export default resolvers;
