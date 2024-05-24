export const checkFileSize = (bytes: number) => {
  const sizeInMb = bytes / (1024 * 1024)
  console.log(sizeInMb)
  return sizeInMb >= 4 ? true : false
}
