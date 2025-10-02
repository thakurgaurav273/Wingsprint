import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

interface User{
  id: string,
  google_id: string,
  name: string,
  email: string,
  mobile: string
}
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private mobileView: WritableSignal<boolean> = signal(false);
  private showLogin: WritableSignal<boolean> = signal(false);
  private loggedInUser: WritableSignal<User | null> = signal(null)
  constructor() {
    this.updateIsMobileView();
  }

  updateIsMobileView(){
    let width = window.innerWidth;
    if(width < 768){
      this.mobileView.set(true);
    }else{
      this.mobileView.set(false)
    }
  }

  setShowNavbar(show: boolean){
    this.showLogin.set(show);
  }

  getShowLogin(){
    return this.showLogin;
  }
  
  getIsMobileView(){
    return this.mobileView;
  }
}
