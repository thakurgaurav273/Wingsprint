import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalDatePipe } from "../../app/pipes/local-date.pipe";
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraft: number;
  originAirport: number;
  airlineLogo: number;
  destinationAirport: string;
  departureTime: string;
  duration: string;
  totalCapacity: number;
  recurringPatterns: Array<any>;
  flightType: string;
  status: string,
  createdAt: Date,
  updatedAt: Date
  classTemplates: any
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

  ngOnInit() {
    this.getDuration()
  }

  getDuration(): string {
    const departureTime = this.flight.recurringPatterns[0].departureTime; // e.g., "10:30:00"
    const arrivalTime = this.flight.recurringPatterns[0].arrivalTime;     // e.g., "14:45:00"

    // Convert time strings to seconds
    const getTimeInSeconds = (timeStr: string): number => {
      const [hours, minutes, seconds] = timeStr.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    // Calculate difference in seconds
    const departureSeconds = getTimeInSeconds(departureTime);
    const arrivalSeconds = getTimeInSeconds(arrivalTime);
    let durationSeconds = arrivalSeconds - departureSeconds;

    // Handle overnight flights (negative duration)
    if (durationSeconds < 0) {
      durationSeconds += 24 * 3600; // Add 24 hours
    }

    // Convert back to HH:MM:SS format
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');

    return `${hh}h:${mm}m`;
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

    return 'Poor';
  }
}