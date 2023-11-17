export const schema = gql`
  type Author {
    id: Int!
    name: String!
    books: [Book]!
  }

  type Query {
    authors: [Author!]! @requireAuth
    author(id: Int!): Author @requireAuth
  }

  input CreateAuthorInput {
    name: String!
  }

  input UpdateAuthorInput {
    name: String
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
    updateAuthor(id: Int!, input: UpdateAuthorInput!): Author! @requireAuth
    deleteAuthor(id: Int!): Author! @requireAuth
  }
`
