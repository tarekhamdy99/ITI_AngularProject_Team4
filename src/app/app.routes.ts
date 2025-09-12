import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Details } from './components/details/details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Account } from './components/account/account';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية

  // Details page with dynamic parameter ':id'
  { path: 'details/:id', component: Details },
    { path: 'login', component: Login, title: 'Login' },

  // Register page
  { path: 'register', component: Register, title: 'Register' },

  // Account page (protected, requires login)
  { path: 'account', component: Account, canActivate: [authGuard], title: 'Account' },
];
