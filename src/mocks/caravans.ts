const getImages = () => {
  return [
    `https://picsum.photos/1920/1080`,
    `https://picsum.photos/1600/900`,
    `https://picsum.photos/1366/768`,
    `https://picsum.photos/1280/720`,
    `https://picsum.photos/1080/1920`,
    `https://picsum.photos/750/1334`,
    `https://picsum.photos/414/896`,
    `https://picsum.photos/360/640`
  ]
}

const images = getImages()

export const caravansMock = [
  {
    id: '1',
    eventName: 'Orquestra Sinfônica - Alumni',
    category: 'show',
    organizerId: '1',
    organizerImage: 'https://picsum.photos/360/360',
    organizerName: 'João Silva',
    originLocation: 'Campos Elíseos, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
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
    category: 'show',
    organizerId: '1',
    organizerName: 'Maria Oliveira',
    organizerImage: 'https://picsum.photos/360/360',
    originLocation: 'Sorocaba, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
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
  },
  {
    id: '3',
    eventName: 'Circo Stankowich',
    category: 'show',
    organizerId: '1',
    organizerName: 'Maria Oliveira',
    organizerImage: 'https://picsum.photos/360/360',
    originLocation: 'Sorocaba, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
    organizerAdress: 'Vila Assis, Sorocaba - SP',
    organizerJoinDate: 'Abril de 2022',
    images: images.slice(0, 3),
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
    id: '4',
    eventName: 'Circo Stankowich',
    category: 'show',
    organizerId: '1',
    organizerName: 'Maria Oliveira',
    organizerImage: 'https://picsum.photos/360/360',
    originLocation: 'Sorocaba, São Paulo',
    destination: 'Praça Júlio Prestes, nº 16, São Paulo-SP',
    organizerAdress: 'Vila Assis, Sorocaba - SP',
    organizerJoinDate: 'Abril de 2022',
    images: images.slice(0, 2),
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
