import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeletePublisherMutationVariables,
  FindPublisherById,
} from 'types/graphql'

const DELETE_PUBLISHER_MUTATION = gql`
  mutation DeletePublisherMutation($id: Int!) {
    deletePublisher(id: $id) {
      id
    }
  }
`

interface Props {
  publisher: NonNullable<FindPublisherById['publisher']>
}

const Publisher = ({ publisher }: Props) => {
  const [deletePublisher] = useMutation(DELETE_PUBLISHER_MUTATION, {
    onCompleted: () => {
      toast.success('Publisher deleted')
      navigate(routes.publishers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePublisherMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete publisher ' + id + '?')) {
      deletePublisher({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Publisher {publisher.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{publisher.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{publisher.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPublisher({ id: publisher.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(publisher.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Publisher
