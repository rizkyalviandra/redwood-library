import type { EditPublisherById, UpdatePublisherInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PublisherForm from 'src/components/Publisher/PublisherForm'

export const QUERY = gql`
  query EditPublisherById($id: Int!) {
    publisher: publisher(id: $id) {
      id
      name
    }
  }
`
const UPDATE_PUBLISHER_MUTATION = gql`
  mutation UpdatePublisherMutation($id: Int!, $input: UpdatePublisherInput!) {
    updatePublisher(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ publisher }: CellSuccessProps<EditPublisherById>) => {
  const [updatePublisher, { loading, error }] = useMutation(
    UPDATE_PUBLISHER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Publisher updated')
        navigate(routes.publishers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePublisherInput,
    id: EditPublisherById['publisher']['id']
  ) => {
    updatePublisher({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Publisher {publisher?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PublisherForm
          publisher={publisher}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
