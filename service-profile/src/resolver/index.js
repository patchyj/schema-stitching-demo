import { merge } from 'lodash';
// import our resolvers
import profileResolver from './profileResolver';

// fake another resolver
const rootResolvers = {};

// Merge all of the resolver objects together, just to show how
const resolvers = merge(rootResolvers, profileResolver);

// export all resolvers
export default resolvers;
