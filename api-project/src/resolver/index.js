import { merge } from 'lodash';
// import our resolvers
import projectResolver from './projectResolver';

// fake another resolver
const rootResolvers = {};

// Merge all of the resolver objects together, just to show how
const resolvers = merge(rootResolvers, projectResolver);

// export all resolvers
export default resolvers;
