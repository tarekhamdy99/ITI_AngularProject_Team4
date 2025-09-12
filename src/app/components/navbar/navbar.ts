import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../shared/movie-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
counter: number = 0;
   isLoggedIn: boolean = false;

  constructor(private _movieService: MovieService, private _authService: AuthService) {}

  ngOnInit(): void {
    this._initializeCounter();
    this._subscribeToLoginState();
  }

  private _initializeCounter(): void {
    this._movieService.counter$.subscribe(count => {
      this.counter = count;
    });
  }

  private _subscribeToLoginState(): void {
    this._authService.loginState$.subscribe(state => {
      this.isLoggedIn = state; // Update login state dynamically
    });
  }

  logout(): void {
    this._authService.logout();
  }
}
