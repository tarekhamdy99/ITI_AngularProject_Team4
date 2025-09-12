import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Wishlist } from './components/wishlist/wishlist';
import { Details } from './components/details/details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Account } from './components/account/account';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: Details },
  { path: 'wishlist', component: Wishlist, title: 'Wishlist' },
    { path: 'login', component: Login, title: 'Login' },

  // Register page
  { path: 'register', component: Register, title: 'Register' },

  // Account page (protected, requires login)
  { path: 'account', component: Account, canActivate: [authGuard], title: 'Account' },
];

