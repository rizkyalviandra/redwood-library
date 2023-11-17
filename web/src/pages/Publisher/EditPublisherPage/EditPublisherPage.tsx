import EditPublisherCell from 'src/components/Publisher/EditPublisherCell'

type PublisherPageProps = {
  id: number
}

const EditPublisherPage = ({ id }: PublisherPageProps) => {
  return <EditPublisherCell id={id} />
}

export default EditPublisherPage
