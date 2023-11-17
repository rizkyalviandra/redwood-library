export const schema = gql`
  type Publisher {
    id: Int!
    name: String!
    books: [Book]!
  }

  type Query {
    publishers: [Publisher!]! @requireAuth
    publisher(id: Int!): Publisher @requireAuth
  }

  input CreatePublisherInput {
    name: String!
  }

  input UpdatePublisherInput {
    name: String
  }

  type Mutation {
    createPublisher(input: CreatePublisherInput!): Publisher! @requireAuth
    updatePublisher(id: Int!, input: UpdatePublisherInput!): Publisher!
      @requireAuth
    deletePublisher(id: Int!): Publisher! @requireAuth
  }
`
