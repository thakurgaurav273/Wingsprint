import { Component, effect } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { AppService } from '../../services/app.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'booking-app-home-page',
  imports: [BannerComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  backgroundImage: string = 'assets/Rectangle.png';
  showLoginCard: boolean = false;
  constructor(private appService: AppService){
    // effect(()=>{
    //   this.showLoginCard = this.appService.getShowLogin()();
    // })
  }
}
