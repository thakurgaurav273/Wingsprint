import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IOptionsProps, DropDownComponent } from '../drop-down/drop-down.component';

@Component({
  selector: 'booking-app-navbar',
  imports: [CommonModule, DropDownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeTab = "flight";
  isMobileDevice: boolean = false;
  showDropdown: boolean = false;
  loggedInUser: any = null;
  showProfileDropdown: boolean = false;

  profileOptions: Array<IOptionsProps> = [];
  navbarOptions: Array<IOptionsProps> = [];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private appService: AppService, private readonly authService: AuthService, private router: Router) {
    effect(() => {
      this.isMobileDevice = this.appService.getIsMobileView()();
      this.loggedInUser = this.authService.getUser();
    })
  }


  toggleDropdown = () => {
    this.showDropdown = !this.showDropdown;
  }

  toggleShowProfileDropdown = () => {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  handleLogin = () => {
    this.router.navigate(['/login'])
  }

  handleSignup = () => {
    this.router.navigate(['/signup'])
  }

  ngOnInit() {
    this.navbarOptions = [
      {
        id: 'find_flight',
        title: 'Find Flights',
        iconUrl: 'assets/airplane.svg',
        onClick: () => this.setActiveTab('flight')
      },
      {
        id: 'find_stays',
        title: 'Find Stays',
        iconUrl: 'assets/ion_bed.svg',
        onClick: () => this.setActiveTab('hotel')
      },
      {
        id: 'login',
        title: 'Login',
        iconUrl: 'assets/ion_bed.svg',
        onClick: () => this.handleLogin()
      },
      {
        id: 'signup',
        title: 'Signup',
        iconUrl: 'assets/ion_bed.svg',
        onClick: () => this.handleSignup()
      }
    ];
    this.profileOptions = [{
      id: 'logout',
      title: 'Logout',
      iconUrl: 'assets/ion_bed.svg',
      onClick: () => this.authService.logout()
    },]
  }
}
