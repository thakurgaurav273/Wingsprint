import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeTab = "flight";
  isMobileDevice: boolean = false;
  showDropdown: boolean = false;
  setActiveTab(tab: string){
    this.activeTab = tab;
  }

  constructor(private appService: AppService, private router: Router){
    effect(()=>{
       this.isMobileDevice = this.appService.getIsMobileView()();
    })
  }
  

  toggleDropdown = () =>{
    this.showDropdown = !this.showDropdown;
  }

  handleLogin = () =>{
    this.router.navigate(['/login'])
  }

  handleSignup = () =>{
    this.router.navigate(['/signup'])
  }
}
