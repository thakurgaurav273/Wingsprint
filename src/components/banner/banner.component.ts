import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-app-banner',
  imports: [FormsModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']  // fixed typo here, was styleUrl
})
export class BannerComponent {
  @Input() bannerType: 'hotel' | 'flight' = 'flight';

  constructor(private searchService: SearchService, private router: Router) {}

  get bannerImageUrl(): string {
    return this.bannerType !== 'hotel' ? 'assets/flight.jpeg' : 'assets/hotel.jpeg';
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

  showPlaces(){
    console.log(this.searchService.getData())
    this.router.navigate(['/search-results'])
  }

  get bannerSearchTitle(): string {
    return this.bannerType !== 'hotel' ? 'Where are you flying?' : 'Where are you staying?';
  }
}
