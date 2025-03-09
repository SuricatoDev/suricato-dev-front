export function formatProductPhoneNumber(
  phone: string,
  isLoggedIn: boolean
): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length < 11) return phone

  const areaCode = cleaned.slice(-11, -9)
  const firstPart = cleaned.slice(-9, -4)
  const secondPart = cleaned.slice(-4)

  if (isLoggedIn) {
    return `(${areaCode}) ${firstPart}-${secondPart}`
  } else {
    return `(${areaCode}) ${firstPart.slice(0, 5)} - ${secondPart[0]}...`
  }
}

export function formatPrice(price: number): string {
  return price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
}

export const returnInitialsLettersIfNotLogged = (
  text: string,
  isLogged: boolean,
  size?: number
) => {
  if (isLogged) return text
  return text.slice(0, size || 4) + '...'
}
