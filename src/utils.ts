export const ensureSuffix = (file: string, suffix: string) => {
  return new RegExp(`\\.${suffix}$`).test(file) ? file : `${file}.${suffix}`
}
