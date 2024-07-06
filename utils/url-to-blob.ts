export async function urlToBlob(url: string): Promise<Blob | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return blob
  } catch (error) {
    console.error('Error fetching URL:', error)
    return null
  }
}

export function blobToFile(blob: Blob, filename: string): File {
  const file = new File([blob], filename, { type: blob.type })
  return file
}
