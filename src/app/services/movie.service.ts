import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'a18352536f548801eff51efc49355dd1';
  private baseUrl = 'https://api.themoviedb.org/3';
  private _counter = new BehaviorSubject<number>(0);
  public counter$ = this._counter.asObservable();

  filteredResults: any[] = [];
  favorites: any[] = [];

  constructor(private http: HttpClient) {
    this.loadFavoritesFromLocalStorage();
  }

  // Get Now Playing Movies
  getNowPlaying(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  // Search Movies
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
  }
   saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // دالة جديدة لتحميل قائمة الأفلام من التخزين المحلي
  loadFavoritesFromLocalStorage() {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
      this._counter.next(this.favorites.length);
    }
  }
  increaseCounter() {
    this._counter.next(this._counter.value + 1);
  }

  decreaseCounter() {
    this._counter.next(this._counter.value - 1);
  }
  //   setCounter(count: number): void {
  //   this._counter.next(count);
  // }

}
