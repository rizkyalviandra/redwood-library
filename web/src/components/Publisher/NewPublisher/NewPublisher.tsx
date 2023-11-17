import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PublisherForm from 'src/components/Publisher/PublisherForm'

import type { CreatePublisherInput } from 'types/graphql'

const CREATE_PUBLISHER_MUTATION = gql`
  mutation CreatePublisherMutation($input: CreatePublisherInput!) {
    createPublisher(input: $input) {
      id
    }
  }
`

const NewPublisher = () => {
  const [createPublisher, { loading, error }] = useMutation(
    CREATE_PUBLISHER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Publisher created')
        navigate(routes.publishers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePublisherInput) => {
    createPublisher({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Publisher</h2>
      </header>
      <div className="rw-segment-main">
        <PublisherForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPublisher
