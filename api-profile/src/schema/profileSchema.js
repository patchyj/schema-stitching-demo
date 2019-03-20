import { gql } from 'apollo-server';

const profile = gql`
  type Experience {
    id: ID
    title: String
    company: String
    location: String
    from: String
    to: String
    current: Boolean
    description: String
  }

  input ExperienceInput {
    id: ID
    title: String
    company: String
    location: String
    from: String
    to: String
    current: Boolean
    description: String
  }

  type Education {
    id: ID
    school: String
    degree: String
    fieldofstudy: String
    from: String
    to: String
    current: Boolean
    description: String
  }

  input EducationInput {
    id: ID
    school: String
    degree: String
    fieldofstudy: String
    from: String
    to: String
    current: Boolean
    description: String
  }

  type Skill {
    id: ID
    name: String
    level: Int
  }

  input SkillInput {
    id: ID
    name: String
    level: Int
  }

  type Profile {
    id: ID
    experience: [Experience]
    education: [Education]
    skills: [Skill]
    user: ID
  }

  type Query {
    allProfiles: [Profile]
    profile(id: ID): Profile
    profileByUserID(user: ID): Profile
  }

  type Mutation {
    addProfile(
      experience: [ExperienceInput]
      education: [EducationInput]
      skills: [SkillInput]
      user: ID
    ): Profile
    updateProfile(
      id: ID!
      experience: [ExperienceInput]
      education: [EducationInput]
      skills: [SkillInput]
      user: ID
    ): Profile
    deleteProfile(id: ID!): String!
    deleteProfileByUserId(user: ID!): String!
  }
`;

export default profile;
