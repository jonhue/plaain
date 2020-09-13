enum HttpMethod {
  GET = 'GET',
}

type Params = Record<string, string>

interface ErrorResponse {
  error: {
    code: number
    message: string
  }
}

export class APIError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)

    this.status = status
  }
}

const buildUrl = (baseUrl: string, path: string, params?: Params) => {
  const url = new URL(`${baseUrl}/${path}`)

  if (params !== undefined)
    for (const [key, value] of Object.entries(params))
      url.searchParams.append(key, value)

  return url
}

const http = async <T>(
  baseUrl: string,
  path: string,
  method: HttpMethod,
  accessToken: string,
  params?: Params,
): Promise<T> => {
  const response = await fetch(buildUrl(baseUrl, path, params).href, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  // check if response is empty
  // if empty just return an empty object
  const text = await response.text()
  const body = text ? JSON.parse(text) : {}

  if (response.ok) return body
  else
    throw new APIError(response.status, (body as ErrorResponse).error.message)
}

export const get = <T>(
  baseUrl: string,
  path: string,
  accessToken: string,
  params: Params,
) => http<T>(baseUrl, path, HttpMethod.GET, accessToken, params)
