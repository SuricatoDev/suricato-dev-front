export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length < 11) return phone

  const areaCode = cleaned.slice(-11, -9)
  const firstPart = cleaned.slice(-9, -4)
  const secondPart = cleaned.slice(-4)

  return `(${areaCode}) ${firstPart}-${secondPart}`
}

export function formatPrice(price: number): string {
  if (!price) return 'R$ 0,00'
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

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

export function formatDateBR(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export function formatTimeBR(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDateRangeBR(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const currentYear = new Date().getFullYear()

  const showYear =
    startDate.getFullYear() > currentYear || endDate.getFullYear() > currentYear

  const format = (date: Date) =>
    date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: showYear ? '2-digit' : undefined
    })

  return `${format(startDate)} - ${format(endDate)}`
}

export function capitalizeCompanyName(name: string): string {
  return name.toLowerCase().replace(/(^|\s|-)\S/g, (char) => char.toUpperCase())
}
