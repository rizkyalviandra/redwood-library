import type { EditAuthorById, UpdateAuthorInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AuthorForm from 'src/components/Author/AuthorForm'

export const QUERY = gql`
  query EditAuthorById($id: Int!) {
    author: author(id: $id) {
      id
      name
    }
  }
`
const UPDATE_AUTHOR_MUTATION = gql`
  mutation UpdateAuthorMutation($id: Int!, $input: UpdateAuthorInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ author }: CellSuccessProps<EditAuthorById>) => {
  const [updateAuthor, { loading, error }] = useMutation(
    UPDATE_AUTHOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Author updated')
        navigate(routes.authors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateAuthorInput,
    id: EditAuthorById['author']['id']
  ) => {
    updateAuthor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Author {author?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AuthorForm
          author={author}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
