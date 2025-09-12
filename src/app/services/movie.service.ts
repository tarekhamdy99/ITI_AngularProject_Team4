// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _counter = new BehaviorSubject<number>(0);
  public counter$ = this._counter.asObservable();

  filteredResults: any[] = [];
  favorites: any[] = [];
  constructor() {
        this.loadFavoritesFromLocalStorage();
  }

  // constructor(private _httpClient: HttpClient) { }
  // getMoviesByPage(page: number): Observable<any>{
  //   return this._httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=668493e3285671fd89719073e48cf97e&page=${page}`)

  // }

  // getMovieById(id: string): Observable<any>{
  //   return this._httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=668493e3285671fd89719073e48cf97e`)
  // }

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
