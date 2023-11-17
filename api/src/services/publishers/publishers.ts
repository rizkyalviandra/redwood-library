import type {
  QueryResolvers,
  MutationResolvers,
  PublisherRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const publishers: QueryResolvers['publishers'] = () => {
  return db.publisher.findMany()
}

export const publisher: QueryResolvers['publisher'] = ({ id }) => {
  return db.publisher.findUnique({
    where: { id },
  })
}

export const createPublisher: MutationResolvers['createPublisher'] = ({
  input,
}) => {
  return db.publisher.create({
    data: input,
  })
}

export const updatePublisher: MutationResolvers['updatePublisher'] = ({
  id,
  input,
}) => {
  return db.publisher.update({
    data: input,
    where: { id },
  })
}

export const deletePublisher: MutationResolvers['deletePublisher'] = ({
  id,
}) => {
  return db.publisher.delete({
    where: { id },
  })
}

export const Publisher: PublisherRelationResolvers = {
  books: (_obj, { root }) => {
    return db.publisher.findUnique({ where: { id: root?.id } }).books()
  },
}
