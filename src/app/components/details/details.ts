import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  movie!: any;
  movieId: string = '';
  recommendedMovies: any[] = [];
  isLoading: boolean = true;
  favorites: any[] = [];

  // ✅ Toast messages
  successMessage: string = '';
  infoMessage: string = '';
  warningMessage: string = '';

  constructor(
    private _movieService: MovieService,
    private _route: ActivatedRoute,
    private _movie: MovieService
  ) {
    this.favorites = this._movie.favorites;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.loadMovie(this.movieId);
      this.loadRecommendations(this.movieId);
    });
  }

  private loadMovie(id: string | number): void {
    this.isLoading = true;
    this.movie = null;
    this._movieService.getMovieDetails(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.movie = null;
        this.isLoading = false;
      },
    });
  }

  private loadRecommendations(id: string | number): void {
    this.recommendedMovies = [];
    this._movieService.getRecommendations(id).subscribe({
      next: (data) => {
        if (data.results && data.results.length > 0) {
          this.recommendedMovies = data.results;
        } else {
          this.loadRandomMovies();
        }
      },
      error: (err) => {
        console.error(err);
        this.loadRandomMovies();
      },
    });
  }

  private loadRandomMovies(): void {
    this.recommendedMovies = [];
    const randomPage = Math.floor(Math.random() * 5) + 1;
    this._movieService.getPopularMovies(randomPage).subscribe({
      next: (data) => (this.recommendedMovies = data.results),
      error: (err) => {
        console.error(err);
        this.recommendedMovies = [];
      },
    });
  }

  isFavorite(movie: any): boolean {
    return this._movie.isFavorite(movie);
  }

  toggleFavorite(movie: any): void {
    const result = this._movie.toggleFavorite(movie);
    if (!result) {
      this.warningMessage = '⚠️ You need to login first!';
      setTimeout(() => (this.warningMessage = ''), 3000);
      return;
    }
    if (this.isFavorite(movie)) {
      this.successMessage = `${movie.title} added to favorites ❤️`;
      setTimeout(() => (this.successMessage = ''), 3000);
    } else {
      this.infoMessage = `${movie.title} removed from favorites 💔`;
      setTimeout(() => (this.infoMessage = ''), 3000);
    }
  }
}
