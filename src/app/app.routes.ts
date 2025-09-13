import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Wishlist } from './components/wishlist/wishlist';
import { Details } from './components/details/details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Account } from './components/account/account';
import { authGuard } from './services/auth-guard';
import { Notfound } from './components/notfound/notfound';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: Details },
  { path: 'wishlist', component: Wishlist, canActivate: [authGuard], title: 'Wishlist' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'account', component: Account, canActivate: [authGuard] },
  { path: '**', component: Notfound }
];

