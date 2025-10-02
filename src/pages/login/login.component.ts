import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    images: string[] = [
    'assets/Rectangle1.png',
    'assets/carousel2.jpg',
    'assets/carousel3.jpg',
  ];

  constructor(private router: Router){

  }
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  handleSignup(){
    this.router.navigate(['/signup'])
  }
}
