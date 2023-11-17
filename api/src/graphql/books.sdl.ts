export const schema = gql`
  type Book {
    id: Int!
    title: String!
    authorId: Int
    publisherId: Int
    author: Author
    publisher: Publisher
  }

  type Query {
    books: [Book!]! @requireAuth
    book(id: Int!): Book @requireAuth
  }

  input CreateBookInput {
    title: String!
    authorId: Int
    publisherId: Int
  }

  input UpdateBookInput {
    title: String
    authorId: Int
    publisherId: Int
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: Int!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: Int!): Book! @requireAuth
  }
`
