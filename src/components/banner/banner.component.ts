import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Airport, AirportService } from '../../services/airport.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'booking-app-banner',
  imports: [FormsModule, CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  @Input() bannerType: 'hotel' | 'flight' = 'flight';
  
  tripType = 'one_way';
  
  // Source airport
  sourceQuery = '';
  sourceSuggestions: Airport[] = [];
  showSourceSuggestions = false;
  selectedSource: Airport | null = null;
  private sourceSearchSubject = new Subject<string>();
  
  // Destination airport
  destinationQuery = '';
  destinationSuggestions: Airport[] = [];
  showDestinationSuggestions = false;
  selectedDestination: Airport | null = null;
  private destinationSearchSubject = new Subject<string>();
  
  constructor(
    private searchService: SearchService,
    private airportService: AirportService,
    private router: Router
  ) {}

  ngOnInit() {
    // Source airport search with debounce
    this.sourceSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.airportService.searchAirports(query))
    ).subscribe(airports => {
      this.sourceSuggestions = airports;
      this.showSourceSuggestions = airports.length > 0;
    });

    // Destination airport search with debounce
    this.destinationSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.airportService.searchAirports(query))
    ).subscribe(airports => {
      this.destinationSuggestions = airports;
      this.showDestinationSuggestions = airports.length > 0;
    });
  }

  ngOnDestroy() {
    this.sourceSearchSubject.complete();
    this.destinationSearchSubject.complete();
  }

  get bannerImageUrl(): string {
    return this.bannerType !== 'hotel' ? 'assets/flight.jpeg' : 'assets/hotel.jpeg';
  }

  // Handle source input change
  onSourceInput(event: any) {
    const value = event.target.value;
    this.sourceQuery = value;
    this.selectedSource = null;
    this.sourceSearchSubject.next(value);
  }

  // Handle destination input change
  onDestinationInput(event: any) {
    const value = event.target.value;
    this.destinationQuery = value;
    this.selectedDestination = null;
    this.destinationSearchSubject.next(value);
  }

  // Select source airport from suggestions
  selectSource(airport: Airport) {
    this.selectedSource = airport;
    this.sourceQuery = `${airport.city} (${airport.code})`;
    this.showSourceSuggestions = false;
    this.searchService.setSource(airport.code);
  }

  // Select destination airport from suggestions
  selectDestination(airport: Airport) {
    this.selectedDestination = airport;
    this.destinationQuery = `${airport.city} (${airport.code})`;
    this.showDestinationSuggestions = false;
    this.searchService.setDestination(airport.code);
  }

  // Close suggestions when clicking outside
  closeSourceSuggestions() {
    setTimeout(() => this.showSourceSuggestions = false, 200);
  }

  closeDestinationSuggestions() {
    setTimeout(() => this.showDestinationSuggestions = false, 200);
  }

  handleInput(id: string, event: any) {
    const value = event.target.value;
    switch (id) {
      case 'checkin':
        this.searchService.setCheckIn(new Date(value));
        break;
      case 'checkout':
        this.searchService.setCheckOut(new Date(value));
        break;
      case 'rooms_guests':
        this.searchService.setRoomGuests(value);
        break;
      case 'trip_type':
        this.tripType = value;
        this.searchService.setTripType(value);
        break;
      default:
        break;
    }
  }

  showPlaces() {
    const data = this.searchService.getData();
    
    if (this.bannerType === 'flight') {
      if (!this.selectedSource || !this.selectedDestination || !data.checkIn) {
        alert("Please fill in required details");
        return;
      }
      if (this.tripType === 'round_trip' && !data.checkOut) {
        alert("Please select return date");
        return;
      }
    } else {
      if (!data.checkIn || !data.checkOut || !data.roomGuests || !data.destination) {
        alert("Please fill in required details");
        return;
      }
    }
    
    this.router.navigate(['/search-results']);
  }

  get bannerSearchTitle(): string {
    return this.bannerType !== 'hotel' ? 'Where are you flying?' : 'Where are you staying?';
  }
}