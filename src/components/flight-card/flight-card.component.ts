import { Component, Input, Output, EventEmitter } from '@angular/core';

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

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  @Output() viewDeals = new EventEmitter<Flight>();
  
  isFavorite = false;
  selectedFlights: string[] = [];

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  toggleFlightSelection(flightId: string): void {
    const index = this.selectedFlights.indexOf(flightId);
    if (index > -1) {
      this.selectedFlights.splice(index, 1);
    } else {
      this.selectedFlights.push(flightId);
    }
  }

  isFlightSelected(flightId: string): boolean {
    return this.selectedFlights.includes(flightId);
  }

  onViewDeals(): void {
    this.viewDeals.emit(this.flight);
  }

  getRatingText(): string {
    if (this.flight.rating >= 4.0) return 'Very Good';
    if (this.flight.rating >= 3.0) return 'Good';
    if (this.flight.rating >= 2.0) return 'Average';
    return 'Poor';
  }
}