import axios, { AxiosError } from 'axios'

export const handleError = (error: any, action?: string): string => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err))
    return err.response?.data.error
      ? error.response.data.error
      : action
        ? `Unable to ${action}. An unexpected error occurred!`
        : 'An unexpected error occurred!'
  return 'An unexpected error occurred!'
}
