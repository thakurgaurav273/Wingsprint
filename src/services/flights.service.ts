import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private readonly http: HttpClient) { }
  BaseURL = 'http://localhost:3000';
  getAllFlights() {
    return this.http.get(`${this.BaseURL}/flight`);
  }

  getFilteredFlights(origin: string, destination: string, departureDate: Date){
      const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     return this.http.post(`${this.BaseURL}/flight/filterFlight`,{
      origin,
      destination,
      departureDate
     }, {headers});
  }

}
