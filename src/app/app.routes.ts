import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Wishlist } from './components/wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', component: Wishlist, title: 'Wishlist' }

];
