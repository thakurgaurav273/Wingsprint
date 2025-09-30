import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public destination: string = '';
  public checkIn: Date = new Date();
  public checkOut: Date = new Date();
  public roomGuests: string = '';

  constructor() { }

  setDestination(destination: string){
    this.destination = destination;
  }

  getData(){
    return {
      destination: this.destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      roomGuests: this.roomGuests
    }
  }

  setCheckIn(checkIn: Date){
    this.checkIn = checkIn;
  }

  setCheckOut(checkOut: Date){
    this.checkOut = checkOut;
  }

  setRoomGuests(roomGuests: string){
    this.roomGuests = roomGuests;
  }

  getDestination(){
    return this.destination;
  }

  getCheckIn(){
    return this.checkIn;
  }

  getCheckOut(){
    return this.checkOut;
  }

  getRoomGuests(){
    return this.roomGuests;
  }
}
