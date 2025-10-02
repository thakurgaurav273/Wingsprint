import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'booking-app';

  constructor (private appService: AppService, private router: Router) {

  }

    get showLayout(): boolean {
    const hiddenRoutes = ['/login', '/signup', '/forgot-password'];
    return !hiddenRoutes.includes(this.router.url);
  }

  handleResizeEvent = () =>{
    this.appService.updateIsMobileView();
  }

  ngOnInit(){
    window.addEventListener('resize', this.handleResizeEvent);
  }

  ngOnDestroy(){
    window.removeEventListener('resize', this.handleResizeEvent);
  }
}
