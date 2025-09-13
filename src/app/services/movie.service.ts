import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = 'a18352536f548801eff51efc49355dd1';
  private baseUrl = 'https://api.themoviedb.org/3';
  private _counter = new BehaviorSubject<number>(0);
  public counter$ = this._counter.asObservable();

  filteredResults: any[] = [];
  favorites: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadFavoritesFromLocalStorage();
    this.authService.loginState$.subscribe(() => {
      this.loadFavoritesFromLocalStorage();
    });
  }

  // Get Now Playing Movies
  getNowPlaying(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`
    );
  }

  // Search Movies
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
    );
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getRecommendations(movieId: number | string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}&language=en-US`
    );
  }

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`
    );
  }

  saveFavoritesToLocalStorage() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser.username}`, JSON.stringify(this.favorites));
    }
  }

  loadFavoritesFromLocalStorage() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const favoritesString = localStorage.getItem(`favorites_${currentUser.username}`);
      if (favoritesString) {
        this.favorites = JSON.parse(favoritesString);
        this._counter.next(this.favorites.length);
        return;
      }
    }
    this.favorites = [];
    this._counter.next(0);
  }

  increaseCounter() {
    this._counter.next(this._counter.value + 1);
  }

  decreaseCounter() {
    this._counter.next(this._counter.value - 1);
  }

  // ✅ Check if movie is in favorites
  isFavorite(movie: any): boolean {
    return this.favorites.some(f => f.id === movie.id);
  }

  // ✅ Toggle favorite
  toggleFavorite(movie: any): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return false;
    }

    const index = this.favorites.findIndex(f => f.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.decreaseCounter();
    } else {
      this.favorites.push(movie);
      this.increaseCounter();
    }

    this.saveFavoritesToLocalStorage();
    return true; 
  }
}
