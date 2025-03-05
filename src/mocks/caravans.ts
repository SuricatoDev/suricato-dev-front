const getImages = () => {
  return [
    `https://picsum.photos/1920/1080`, // Full HD
    `https://picsum.photos/1600/900`, // Widescreen menor
    `https://picsum.photos/1366/768`, // Laptop
    `https://picsum.photos/1280/720`, // HD
    `https://picsum.photos/1080/1920`, // Mobile (Retrato)
    `https://picsum.photos/750/1334`, // iPhone 7 (Mobile)
    `https://picsum.photos/414/896`, // iPhone XR
    `https://picsum.photos/360/640` // Android Padrão
  ]
}

const images = getImages()

export const caravansMock = [
  {
    id: '1',
    eventName: 'Orquestra Sinfônica - Alumni',
    organizerName: 'João Silva',
    originLocation: 'Campos Elíseos, São Paulo',
    organizerPhone: '+5515991234567',
    images
  },
  {
    id: '2',
    eventName: 'Circo Stankowich',
    organizerName: 'Maria Oliveira',
    originLocation: 'Sorocaba, São Paulo',
    organizerPhone: '+552199999999',
    images
  }
]
