export function registerUserQuery() {
  return `
    mutation registerUser(
      $firstName: String, 
      $lastName: String, 
      $email: String, 
      $password: String, 
      $password2: String
      ) {
      registerUser(
        firstName: $firstName,
        lastName: $lastName, 
        email:$email, 
        password:$password, 
        password2: $password2
      ) {
      firstName
    }
  }`;
}

export function loginUserQuery() {
  return `
    mutation loginUser(
      $email:String, 
      $password:String!
      ) {
      loginUser(
        email:$email, 
        password:$password
      )
    }
  `;
}
