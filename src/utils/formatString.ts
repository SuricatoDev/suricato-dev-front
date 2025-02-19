export function formatString(
  inputString: string | undefined
): string | undefined {
  if (inputString) {
    return inputString
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/:\s+/g, ':')
      .replace(/\s+/g, '_')
      .replace(/[-,\s]*$/, '')
      .replace(/,+/g, '')
  } else {
    return undefined
  }
}

export function formatStringAlt(
  inputString: string | undefined
): string | undefined {
  if (inputString) {
    return inputString
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/:\s+/g, ':')
      .replace(/\s+/g, '-')
      .replace(/[-,\s]*$/, '')
      .replace(/,+/g, '')
  } else {
    return undefined
  }
}
