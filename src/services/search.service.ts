import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public destination: string = '';
  public checkIn: Date = new Date();
  public checkOut: Date = new Date();
  public roomGuests: string = '1 room, 1 guest';
  public tripType: 'one_way' | 'round_trip' = 'one_way';
  public source: string = '';
  constructor() { }

  setDestination(code: string) { this.destination = code; }

  getData() {
    return {
      source: this.source,
      destination: this.destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      roomGuests: this.roomGuests,
      tripType: this.tripType
    }
  }

  

  setCheckIn(checkIn: Date) {
    this.checkIn = checkIn;
  }

  setCheckOut(checkOut: Date) {
    this.checkOut = checkOut;
  }

  setRoomGuests(roomGuests: string) {
    this.roomGuests = roomGuests;
  }

  setTripType(tripType: 'one_way' | 'round_trip') {
    this.tripType = tripType;
  }

  getDestination() {
    return this.destination;
  }

  setSource(code: string) { this.source = code; }

  getCheckIn() {
    return this.checkIn;
  }

  getCheckOut() {
    return this.checkOut;
  }

  getRoomGuests() {
    return this.roomGuests;
  }

  getTripType() {
    return this.tripType;
  }
}
