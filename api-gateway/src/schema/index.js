import { mergeSchemas } from 'graphql-tools';
import makeResolvers from '../resolver';
import createRemoteExecutableSchemas from '../remoteSchema';
import relationsSchema from './relationsSchema';

export default async () => {
	// Get all remote schemas
	const schemas = await createRemoteExecutableSchemas();

	const resolvers = await makeResolvers(schemas);

	return mergeSchemas({
		schemas: [...schemas, relationsSchema],
		resolvers
	});
};
// ======= IMPORTED IN SRC/INDEX.JS ======
