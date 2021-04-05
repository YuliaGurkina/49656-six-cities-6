export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
};

export const APIRoute = {
  OFFERS: `/hotels`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  COMMENTS: `/comments`,
  FAVORITE: `favorite`
};

export const OfferType = {
  ROOM: `Private Room`,
  APARTMENT: `Apartment`,
  HOTEL: `Hotel`,
  HOUSE: `House`
};

export const monthNames = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const countLettersReview = {
  MIN: 50,
  MAX: 300
};


export const locations = [
  {
    name: `Paris`,
    id: 1,
  },
  {
    name: `Cologne`,
    id: 2,
  },
  {
    name: `Brussels`,
    id: 3,
  },
  {
    name: `Amsterdam`,
    id: 4,
  },
  {
    name: `Hamburg`,
    id: 5,
  },
  {
    name: `Dusseldorf`,
    id: 6,
  }
];

export const options = [
  {
    name: `Popular`,
    id: 0
  },
  {
    name: `Price: low to high`,
    id: 1
  },
  {
    name: `Price: high to low`,
    id: 2
  },
  {
    name: `Top rated first`,
    id: 3
  },
];
