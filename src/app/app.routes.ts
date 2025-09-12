import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Wishlist } from './components/wishlist/wishlist';
import { Details } from './components/details/details';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: Details },
  { path: 'wishlist', component: Wishlist, title: 'Wishlist' }

];
