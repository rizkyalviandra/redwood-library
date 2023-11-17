import type { FindPublishers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Publishers from 'src/components/Publisher/Publishers'

export const QUERY = gql`
  query FindPublishers {
    publishers {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No publishers yet. '}
      <Link to={routes.newPublisher()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ publishers }: CellSuccessProps<FindPublishers>) => {
  return <Publishers publishers={publishers} />
}
