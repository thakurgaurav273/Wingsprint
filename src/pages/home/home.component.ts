import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'booking-app-home-page',
  imports: [NavbarComponent, BannerComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  backgroundImage: string = 'assets/Rectangle.png';
}
