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
    category: 'shows',
    organizerId: '1',
    organizerImage: 'https://picsum.photos/360/360',
    organizerName: 'João Silva',
    originLocation: 'Campos Elíseos, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
    organizerPhone: '15991234567',
    organizerAdress: 'Vila Assis, Sorocaba - SP',
    organizerJoinDate: 'Abril de 2022',
    images,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent vitae eros eget tellus tristique bibendum. Donec
      rutrum sed sem quis venenatis. Proin viverra risus a
      ringilla varius. Nulla facilisi. Curabitur nec lacus
      elit. Pellentesque convallis nisi ac augue pharetra eu
      tristique neque consequat. Lorem ipsum dolor sit amet,
      onsectetur adipiscing elit. Praesent vitae eros eget
      tellus tristique bibendum.`,
    price: 100
  },
  {
    id: '2',
    eventName: 'Circo Stankowich',
    category: 'shows',
    organizerId: '1',
    organizerName: 'Maria Oliveira',
    organizerImage: 'https://picsum.photos/360/360',
    originLocation: 'Sorocaba, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
    organizerPhone: '2199999999',
    organizerAdress: 'Vila Assis, Sorocaba - SP',
    organizerJoinDate: 'Abril de 2022',
    images: images.slice(0, 4),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent vitae eros eget tellus tristique bibendum. Donec
      rutrum sed sem quis venenatis. Proin viverra risus a
      ringilla varius. Nulla facilisi. Curabitur nec lacus
      elit. Pellentesque convallis nisi ac augue pharetra eu
      tristique neque consequat. Lorem ipsum dolor sit amet,
      onsectetur adipiscing elit. Praesent vitae eros eget
      tellus tristique bibendum.`,
    price: 100
  }
]
