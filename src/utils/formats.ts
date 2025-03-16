export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length < 11) return phone

  const areaCode = cleaned.slice(-11, -9)
  const firstPart = cleaned.slice(-9, -4)
  const secondPart = cleaned.slice(-4)

  return `(${areaCode}) ${firstPart}-${secondPart}`
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

export const formatExcursionistasSince = (createdAt: string): string => {
  const date = new Date(createdAt)
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  return `No Excursionistas desde ${month} de ${year}`
}
