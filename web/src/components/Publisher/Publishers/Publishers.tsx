import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Publisher/PublishersCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeletePublisherMutationVariables,
  FindPublishers,
} from 'types/graphql'

const DELETE_PUBLISHER_MUTATION = gql`
  mutation DeletePublisherMutation($id: Int!) {
    deletePublisher(id: $id) {
      id
    }
  }
`

const PublishersList = ({ publishers }: FindPublishers) => {
  const [deletePublisher] = useMutation(DELETE_PUBLISHER_MUTATION, {
    onCompleted: () => {
      toast.success('Publisher deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePublisherMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete publisher ' + id + '?')) {
      deletePublisher({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.id}>
              <td>{truncate(publisher.id)}</td>
              <td>{truncate(publisher.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.publisher({ id: publisher.id })}
                    title={'Show publisher ' + publisher.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPublisher({ id: publisher.id })}
                    title={'Edit publisher ' + publisher.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete publisher ' + publisher.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(publisher.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PublishersList
