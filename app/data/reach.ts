export interface ClientPlace {
  country: string;
  code: string;
  /** Approximate centroid, used to plot the marker on the globe. */
  lat: number;
  lon: number;
  orders: number;
}

/** Countries clients have ordered from, taken from the Fiverr export. */
export const clientPlaces: ClientPlace[] = [
  { country: 'United States', code: 'US', lat: 39.0, lon: -98.0, orders: 63 },
  { country: 'United Kingdom', code: 'GB', lat: 54.0, lon: -2.0, orders: 29 },
  { country: 'India', code: 'IN', lat: 21.0, lon: 78.0, orders: 9 },
  { country: 'Netherlands', code: 'NL', lat: 52.2, lon: 5.3, orders: 8 },
  { country: 'Pakistan', code: 'PK', lat: 30.4, lon: 69.3, orders: 7 },
  { country: 'Canada', code: 'CA', lat: 56.1, lon: -106.3, orders: 5 },
  { country: 'Portugal', code: 'PT', lat: 39.4, lon: -8.2, orders: 3 },
  { country: 'Italy', code: 'IT', lat: 41.9, lon: 12.6, orders: 3 },
  { country: 'New Zealand', code: 'NZ', lat: -40.9, lon: 174.9, orders: 3 },
  { country: 'France', code: 'FR', lat: 46.2, lon: 2.2, orders: 2 },
  { country: 'Germany', code: 'DE', lat: 51.2, lon: 10.4, orders: 2 },
  { country: 'Hong Kong', code: 'HK', lat: 22.3, lon: 114.2, orders: 2 },
  { country: 'Singapore', code: 'SG', lat: 1.35, lon: 103.8, orders: 2 },
  { country: 'Australia', code: 'AU', lat: -25.3, lon: 133.8, orders: 1 },
  { country: 'China', code: 'CN', lat: 35.9, lon: 104.2, orders: 1 },
  { country: 'Denmark', code: 'DK', lat: 56.3, lon: 9.5, orders: 1 },
  { country: 'Estonia', code: 'EE', lat: 58.6, lon: 25.0, orders: 1 },
  { country: 'Japan', code: 'JP', lat: 36.2, lon: 138.3, orders: 1 },
  { country: 'Kuwait', code: 'KW', lat: 29.3, lon: 47.5, orders: 1 },
  { country: 'Maldives', code: 'MV', lat: 3.2, lon: 73.2, orders: 1 },
  { country: 'Nigeria', code: 'NG', lat: 9.1, lon: 8.7, orders: 1 },
  { country: 'Poland', code: 'PL', lat: 51.9, lon: 19.1, orders: 1 },
  { country: 'Switzerland', code: 'CH', lat: 46.8, lon: 8.2, orders: 1 },
];

/** Home base, drawn differently from the client markers. */
export const homeBase = { country: 'Pakistan', city: 'Islamabad', lat: 33.68, lon: 73.05 };
