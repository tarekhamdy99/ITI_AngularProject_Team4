import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
counter: number = 0;
isLoggedIn: boolean = false;
isDarkMode = false;

  constructor(private _movieService: MovieService, private _authService: AuthService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this._initializeCounter();
    this.isLoggedIn = this._authService.isAuthenticated();
    this._subscribeToLoginState();
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }

  logout(): void {
    this._authService.logout();
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
 toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

}
