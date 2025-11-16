import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { SearchResultsComponent } from '../pages/search-results/search-results.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] }, // Protected
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'search-results', component: SearchResultsComponent, canActivate: [authGuard] }, // Protected
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: '' }
];
