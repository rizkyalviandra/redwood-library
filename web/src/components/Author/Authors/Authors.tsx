import type { DeleteAuthorMutationVariables, FindAuthors } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Author/AuthorsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_AUTHOR_MUTATION = gql`
  mutation DeleteAuthorMutation($id: Int!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`

const AuthorsList = ({ authors }: FindAuthors) => {
  const [deleteAuthor] = useMutation(DELETE_AUTHOR_MUTATION, {
    onCompleted: () => {
      toast.success('Author deleted')
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

  const onDeleteClick = (id: DeleteAuthorMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete author ' + id + '?')) {
      deleteAuthor({ variables: { id } })
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
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{truncate(author.id)}</td>
              <td>{truncate(author.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.author({ id: author.id })}
                    title={'Show author ' + author.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAuthor({ id: author.id })}
                    title={'Edit author ' + author.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete author ' + author.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(author.id)}
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

export default AuthorsList
