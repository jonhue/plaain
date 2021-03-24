import { Client } from 'basic-ftp'

export const getClient = async (
  host: string,
  port: number,
  user: string,
  password: string,
  secure: boolean,
) => {
  const client = new Client()
  if (process.env.NODE_ENV === 'development') client.ftp.verbose = true
  await client.access({ host, port, user, password, secure })
  return client
}

export const fetchItems = (client: Client, path: string) => client.list(path)

export const fetchItem = async (client: Client, path: string) => {
  const dirPath = path.split('/')
  const filename = dirPath.pop()
  if (filename === undefined)
    throw new Error('Cannot fetch item with an empty path.')
  const files = await fetchItems(client, dirPath.join('/'))
  return files.find(({ name }) => name === filename)
}
