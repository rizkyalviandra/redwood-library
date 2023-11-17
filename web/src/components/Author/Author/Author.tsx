import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteAuthorMutationVariables,
  FindAuthorById,
} from 'types/graphql'

const DELETE_AUTHOR_MUTATION = gql`
  mutation DeleteAuthorMutation($id: Int!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`

interface Props {
  author: NonNullable<FindAuthorById['author']>
}

const Author = ({ author }: Props) => {
  const [deleteAuthor] = useMutation(DELETE_AUTHOR_MUTATION, {
    onCompleted: () => {
      toast.success('Author deleted')
      navigate(routes.authors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAuthorMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete author ' + id + '?')) {
      deleteAuthor({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Author {author.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{author.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{author.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAuthor({ id: author.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(author.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Author
