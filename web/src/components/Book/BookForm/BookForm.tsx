import type { EditBookById, UpdateBookInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

import { QUERY as AUTHORQUERY } from 'src/components/Author/AuthorsCell'
import { QUERY as PUBLISHERQUERY } from 'src/components/Publisher/PublishersCell'

type FormBook = NonNullable<EditBookById['book']>

interface BookFormProps {
  book?: EditBookById['book']
  onSave: (data: UpdateBookInput, id?: FormBook['id']) => void
  error: RWGqlError
  loading: boolean
}

const BookForm = (props: BookFormProps) => {
  const onSubmit = (data: FormBook) => {
    const newData = {
      ...data,
      authorId: Number(data.authorId),
      publisherId: Number(data.publisherId),
    }
    props.onSave(newData, props?.book?.id)
  }

  const authors = useQuery(AUTHORQUERY)
  const publisher = useQuery(PUBLISHERQUERY)

  return (
    <div className="rw-form-wrapper">
      <Form<FormBook> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.book?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="authorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author id
        </Label>

        <SelectField
          name="authorId"
          defaultValue={props.book?.authorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        >
          {authors?.data?.authors?.map((author) => (
            <option key={author.id} value={Number(author.id)}>
              {author.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="authorId" className="rw-field-error" />

        <Label
          name="publisherId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Publisher id
        </Label>

        <SelectField
          name="publisherId"
          defaultValue={props.book?.publisherId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        >
          {publisher?.data?.publishers?.map((publisher) => (
            <option key={publisher.id} value={Number(publisher.id)}>
              {publisher.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="publisherId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookForm
