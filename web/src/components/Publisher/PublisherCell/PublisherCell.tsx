import type { FindPublisherById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Publisher from 'src/components/Publisher/Publisher'

export const QUERY = gql`
  query FindPublisherById($id: Int!) {
    publisher: publisher(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Publisher not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ publisher }: CellSuccessProps<FindPublisherById>) => {
  return <Publisher publisher={publisher} />
}
