import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  images: string[] = [
    'assets/Rectangle1.png',
    'assets/carousel2.jpg',
    'assets/carousel3.jpg',
  ];

  constructor(private router: Router, private authService: AuthService) {

  }
  currentIndex = 0;
  user: {
    email: string,
    password: string,
  } = {
      email: '',
      password: ''
    }
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  handleLogin() {
    console.log(this.user);
     this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Login failed', error);
        // this.errorMessage = 'Invalid username or password';
      }
    });
  }


  handleSignup() {
    this.router.navigate(['/signup'])
  }
}
