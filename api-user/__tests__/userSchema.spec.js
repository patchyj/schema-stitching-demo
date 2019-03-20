import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from '../src/resolver/userResolver';
import typeDefs from '../src/schema/userSchema';
import mockMovieService from './mocks/mockUsers';

const allUsersTestCase = {
    id: "All Users Test Case",
    query: `
        query {
            allUsers {
                id
                firstName
                lastName
                email
            }
        }
    `,
    variables: {},
    context: { userService: mockMovieService },
    expected: {
        data: {
            allUsers: [
                {
                    id: 1,
                    firstName: 'Testy',
                    lastName: 'McTesterson',
                    email: 'test1@test.com'
                },
                {
                    id: 12,
                    firstName: 'Testerall',
                    lastName: 'Testofferson',
                    email: 'test2@test.com'
                }
            ]
        }
    }
}

describe('SCHEMA', () => {
    const cases = [allUsersTestCase];
    const typeDefs = typeDefs;
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj;
        it(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        });
    })
});