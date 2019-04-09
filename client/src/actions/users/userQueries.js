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
    query getUser($id: ID) {
      getUser(id: $id) {
        id
        firstName
        lastName
        email
      }
    }
  `;
}
