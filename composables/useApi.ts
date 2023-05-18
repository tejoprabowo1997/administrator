export const useApi = async (
  url: string,
  method:
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'get'
    | 'head'
    | 'patch'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | undefined,
  body: any | null = null,
  query: any | null = null
) => {
  const helperStore = await useHelperStore()
  const baseUrl = helperStore.config.baseUrlApi

  interface IResponse {
    success: boolean
    count: number
    pageLength: number
    message: string
    result: any
  }
  try {
    const response: IResponse = await $fetch(`${baseUrl}${url}`, {
      method,
      body,
      query,
    })
    return response
  } catch (error: unknown) {
    helperStore.setAlert(true, (error as Error).name, (error as Error).message, 'error')
    return {
      success: false,
      count: 0,
      pageLength: 0,
      message: (error as Error).message,
      result: [],
    }
  }
}
