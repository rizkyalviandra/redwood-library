import type { FindAuthors } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Authors from 'src/components/Author/Authors'

export const QUERY = gql`
  query FindAuthors {
    authors {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No authors yet. '}
      <Link to={routes.newAuthor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ authors }: CellSuccessProps<FindAuthors>) => {
  return <Authors authors={authors} />
}
