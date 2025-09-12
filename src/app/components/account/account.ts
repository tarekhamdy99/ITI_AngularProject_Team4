import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth-service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class Account {
  currentUser: User | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
