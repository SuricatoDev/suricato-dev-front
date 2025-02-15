// src/constants/categories.ts
import show from '@assets/show.png';
import beach from '@assets/beach.png';
import seeMore from '@assets/see-more.png';
import excursion from '@assets/excursion.png';
import hiking from '@assets/hiking.png';
import amusementPark from '@assets/amusement-park.png';

export const categories = [
  { title: 'Excursões', image: excursion, size: 'lg', route: 'excursion' },
  { title: 'Shows', image: show, size: 'lg', route: 'shows' },
  { title: 'Praias', image: beach, size: 'md', route: 'beaches' },
  { title: 'Trilhas', image: hiking, size: 'md', route: 'hikings' },
  { title: 'Parques', image: amusementPark, size: 'md', route: 'amusement_park' },
  { title: 'Ver mais', image: seeMore, size: 'md', route: 'see_more' },
];
