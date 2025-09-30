import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FlightCardComponent } from "../../components/flight-card/flight-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  constructor(private searchService: SearchService) {
    this.data = this.searchService.getData();
  }
  priceRange = { min: 50, max: 1200 };
  departureTimeRange = { start: '12:01Am', end: '11:56Pm' };
  
  selectedRatings: number[] = [];
  selectedAirlines: string[] = [];
  selectedTripTypes: string[] = [];
  
  totalResults = 257;
  displayedResults = 4;
  sortBy = 'Recommended';
  
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
  
  flights: Flight[] = [
    {
      id: '1',
      airline: 'Emirates',
      airlineLogo: 'emirates-logo.png',
      rating: 4.2,
      reviewCount: 54,
      price: 104,
      departureTime: '12:00 pm',
      arrivalTime: '01:28 pm',
      duration: '2h 28m',
      route: 'EWR-BNA',
      isNonStop: true
    },
    {
      id: '2',
      airline: 'flydubai',
      airlineLogo: 'flydubai-logo.png',
      rating: 4.2,
      reviewCount: 54,
      price: 104,
      departureTime: '12:00 pm',
      arrivalTime: '01:28 pm',
      duration: '2h 28m',
      route: 'EWR-BNA',
      isNonStop: true
    },
    {
      id: '3',
      airline: 'Qatar Airways',
      airlineLogo: 'qatar-logo.png',
      rating: 4.2,
      reviewCount: 54,
      price: 104,
      departureTime: '12:00 pm',
      arrivalTime: '01:28 pm',
      duration: '2h 28m',
      route: 'EWR-BNA',
      isNonStop: true
    },
    {
      id: '4',
      airline: 'Etihad',
      airlineLogo: 'etihad-logo.png',
      rating: 4.2,
      reviewCount: 54,
      price: 104,
      departureTime: '12:00 pm',
      arrivalTime: '01:28 pm',
      duration: '2h 28m',
      route: 'EWR-BNA',
      isNonStop: true
    }
  ];

  ngOnInit(): void {}

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

  onFlightSelect(flight: Flight): void {
    console.log('Selected flight:', flight);
  }
  toggleFilter(id: string){

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
