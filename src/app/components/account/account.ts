import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth-service';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class Account implements OnInit, OnDestroy {
  currentUser: User | null = null;
  favoritesCount: number = 0;
  private favoritesSubscription!: Subscription;

  constructor(private auth: AuthService, private router: Router, private movieService: MovieService) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit() {
    this.favoritesSubscription = this.movieService.counter$.subscribe(count => {
      this.favoritesCount = count;
    });
  }

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
