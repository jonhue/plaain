export const parseFileName = (fileName: string) => ({
  name: fileName.split('.').shift()!,
  extension: fileName.split('.').pop(),
})
