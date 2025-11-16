import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FlightCardComponent } from "../../components/flight-card/flight-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';

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
  selector: 'booking-app-search-result',
  imports: [FlightCardComponent, CommonModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  data: any = null;
  searchType: 'flight' | 'hotel' = 'flight';
  constructor(private searchService: SearchService, private flightService: FlightsService) {
    this.data = this.searchService.getData();
    console.log(this.data)
  }
  priceRange = { min: 50, max: 1200 };
  departureTimeRange = { min: '12:01', max: '23:59' };

  selectedRatings: number[] = [];
  selectedAirlines: string[] = [];
  selectedTripTypes: string[] = [];

  airlines = [
    { name: 'Emirated', value: 'emirated', checked: false },
    { name: 'Fly Dubai', value: 'flydubai', checked: false },
    { name: 'Qatar', value: 'qatar', checked: false },
    { name: 'Etihad', value: 'etihad', checked: false }
  ];

  tripTypes = [
    { name: 'Round trip', value: 'round', checked: false },
    { name: 'On Way', value: 'oneway', checked: false },
    { name: 'Multi-City', value: 'multicity', checked: false },
    { name: 'My Dates Are Flexible', value: 'flexible', checked: false }
  ];

  ratings = [0, 1, 2, 3, 4];

  flights: Array<any> = [];
  totalResults = 0;
  displayedResults = 4;
  sortBy = 'Recommended';

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((results:any)=>{
      console.log(results)
    });
    console.log(this.data)
    this.flightService.getFilteredFlights(this.data.source, this.data.destination, this.data.checkIn).subscribe((results: any) => {
      this.flights = results;
      this.totalResults = this.flights.length;
    })
  }

  onPriceChange(value: any): void {
    this.priceRange = value;
  }

  onDepartureTimeChange(value: any): void {
    this.departureTimeRange = value;
  }

  toggleRating(rating: number): void {
    const index = this.selectedRatings.indexOf(rating);
    if (index > -1) {
      this.selectedRatings.splice(index, 1);
    } else {
      this.selectedRatings.push(rating);
    }
  }

  onAirlineChange(airline: any): void {
    airline.checked = !airline.checked;
  }

  onTripTypeChange(tripType: any): void {
    tripType.checked = !tripType.checked;
  }

  onSortChange(sort: string): void {
    this.sortBy = sort;
  }

  showMoreResults(): void {
    console.log('Show more results');
  }

  onFlightSelect(event: any): void {
    console.log('Selected flight:', event);
  }
  toggleFilter(id: string) {

  }

  handleInput(id: string, event: any) {
    const value = event.target.value;
    switch (id) {
      case 'destination':
        this.searchService.setDestination(value);
        break;
      case 'checkin':
        this.searchService.setCheckIn(new Date(value));
        break;
      case 'checkout':
        this.searchService.setCheckOut(new Date(value));
        break;
      case 'rooms_guests':
        this.searchService.setRoomGuests(value);
        break;
      default:
        break;
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;  // YYYY-MM-DD format required by input[type=date]
  }
}
