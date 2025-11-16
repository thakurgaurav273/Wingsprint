import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  displayText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private apiUrl = 'http://localhost:3000/airports'; // Your backend URL

  // Fallback mock data for testing
  private mockAirports: Airport[] = [
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
    { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
    { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
    { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' }
  ];

  constructor(private http: HttpClient) { }

  searchAirports(query: string): Observable<Airport[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    // Use mock data or make API call
    return this.searchFromAPI(query);
    // For real API: return this.searchFromAPI(query);
  }

  private searchFromMock(query: string): Observable<Airport[]> {
    const normalizedQuery = query.toLowerCase();
    const filtered = this.mockAirports.filter(airport =>
      airport.code.toLowerCase().includes(normalizedQuery) ||
      airport.name.toLowerCase().includes(normalizedQuery) ||
      airport.city.toLowerCase().includes(normalizedQuery) ||
      airport.country.toLowerCase().includes(normalizedQuery)
    ).map(airport => ({
      ...airport,
      displayText: `${airport.city} (${airport.code}) - ${airport.name}`
    }));

    return of(filtered);
  }

  private searchFromAPI(query: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      map(airports => airports.map(airport => ({
        ...airport,
        displayText: `${airport.city} (${airport.code}) - ${airport.name}`
      })))
    );
  }
}
