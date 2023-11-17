import PublisherCell from 'src/components/Publisher/PublisherCell'

type PublisherPageProps = {
  id: number
}

const PublisherPage = ({ id }: PublisherPageProps) => {
  return <PublisherCell id={id} />
}

export default PublisherPage
