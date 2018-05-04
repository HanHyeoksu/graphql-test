module.exports = `
  type Query {
    users: [User]
  }

  type Mutation {
    signup(payload: AuthData): User
    signin(payload: AuthData): SigninPayload
  }

  input AuthData {
    email: String
    password: String
  }

  type User {
    _id: String
    email: String
  }

  type SigninPayload {
    user: User
    token: String
  }
`;