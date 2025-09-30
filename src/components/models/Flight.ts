export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  rating: number;
  reviewCount: number;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  route: string;
  isNonStop: boolean;
}

export interface FilterOption {
  name: string;
  value: string;
  checked: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export enum SortOption {
  RECOMMENDED = 'Recommended',
  PRICE = 'Price',
  DURATION = 'Duration',
  RATING = 'Rating'
}