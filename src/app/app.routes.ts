import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Details } from './components/details/details';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية

  // Details page with dynamic parameter ':id'
  { path: 'details/:id', component: Details },
];
