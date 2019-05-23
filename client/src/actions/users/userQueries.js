/* eslint-disable no-tabs */
const profileQuery = `
  profile {
    experience {
      id
      title
      company
      location
      from
      to
      current
      description
    }
    education {
      id
      school
      degree
      fieldofstudy
      from
      to
      current
      description
    }
    skills {
      id
      name
      level
    }
  }
`;

export function getUsersQuery() {
	return `
    query getUsers {
      getUsers {
        id
        firstName
        lastName
        email
        password
      }
    }
  `;
}

export function getUserQuery({ profile }) {
	return `
    query getUser($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        email
        tagline
        avatar
        blogs { id }
        projects { id }
        ${profile && profileQuery}
      }
    }
  `;
}
