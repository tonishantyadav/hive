export const checkFileSize = (bytes: number) => {
  const sizeInMb = bytes / (1024 * 1024)
  return sizeInMb >= 4 ? true : false
}
