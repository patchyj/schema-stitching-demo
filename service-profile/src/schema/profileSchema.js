import { gql } from 'apollo-server';

const profile = gql`
  type Experience {
    title: String!
    company: String!
    location: String!
    from: String!
    to: String!
    current: Boolean!
    description: String!
  }

  type Education {
    school: String!
    degree: String!
    fieldofstudy: String!
    from: String!
    to: String!
    current: Boolean!
    description: String!
  }

  type Skill {
    name: String!
    level: Int!
  }

  type Profile {
    id: ID!
    experience: [Experience]!
    education: [Education]!
    skills: [Skill]!
    user: ID
  }

  type Query {
    allProfiles: [Profile!]
    profile(id: ID!): Profile
    profileByUserID(userID: ID!): Profile
  }
`;

export default profile;
