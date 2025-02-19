export function removeEducationTypes(input: string): string {
  const regex =
    /\b(Bacharelado|bacharelado|Tecnólogo|tecnólogo|Tecnologo|tecnologo|Licenciatura|licenciatura)\b|-$/g
  return input
    .replace(regex, '')
    .replace(/[-,\s]*$/, '')
    .trim()
}
