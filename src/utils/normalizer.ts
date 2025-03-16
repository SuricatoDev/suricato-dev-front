export const normalizeInput = (value: string): string => {
  return value.replace(/\D/g, '')
}
