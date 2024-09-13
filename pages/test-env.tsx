export default function TestEnv({ albumHash, clientId }: { albumHash: string, clientId: string }) {
  return (
    <div>
      <h1>Test Environment Variables</h1>
      <p>Album Hash: {albumHash}</p>
      <p>Client ID: {clientId}</p>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      albumHash: process.env.IMGUR_ALBUM_HASH || 'Not found',
      clientId: process.env.IMGUR_CLIENT_ID || 'Not found',
    },
  }
}