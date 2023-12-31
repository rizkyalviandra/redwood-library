import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPublisherById, UpdatePublisherInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPublisher = NonNullable<EditPublisherById['publisher']>

interface PublisherFormProps {
  publisher?: EditPublisherById['publisher']
  onSave: (data: UpdatePublisherInput, id?: FormPublisher['id']) => void
  error: RWGqlError
  loading: boolean
}

const PublisherForm = (props: PublisherFormProps) => {
  const onSubmit = (data: FormPublisher) => {
    props.onSave(data, props?.publisher?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPublisher> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.publisher?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PublisherForm
