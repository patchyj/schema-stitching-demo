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

export function getUserQuery() {
  return `
    query getUser($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
        email
        blogs { id }
        projects { id }
      }
    }
  `;
}
