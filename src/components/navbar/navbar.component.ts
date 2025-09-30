import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'booking-app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeTab = "flight";

  setActiveTab(tab: string){
    this.activeTab = tab;
  }
}
