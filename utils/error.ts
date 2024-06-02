import axios, { AxiosError } from 'axios'

export const handleError = (error: any, action?: string): string => {
  // Check if the error is an instance of AxiosError
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific errors
    if (error.response) {
      // Server responded with a status other than 2xx
      return (
        error.response.data.error ||
        'An error occurred while processing your request.'
      )
    } else if (error.request) {
      // No response received from the server
      return 'Unable to connect to the server. Please check your internet connection.'
    } else {
      // Something happened in setting up the request
      return 'An error occurred while setting up the request. Please try again.'
    }
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    return error.message || 'An unexpected error occurred.'
  }

  // Return a generic error message if the error is not an AxiosError or an instance of Error
  return action
    ? `An error occurred while trying to ${action}.`
    : 'An unexpected error occurred.'
}
