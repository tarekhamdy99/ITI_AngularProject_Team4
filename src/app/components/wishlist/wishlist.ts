import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../shared/movie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist  {
  favorites: any[] = []
    constructor(private _movie : MovieService){
    this.favorites = this._movie.favorites;
    }
  getFavorites(): any[] {
    return this.favorites;
  }
  toggleFavorite(movie: any): void {
    const index = this.favorites.findIndex(f => f.id === movie.id);
  if (index > -1) {
    this.favorites.splice(index, 1);
    this._movie.decreaseCounter();
  } else {
    this.favorites.push(movie);
    this._movie.increaseCounter();
  }
  this._movie.favorites = this.favorites;
  this._movie.saveFavoritesToLocalStorage();
  }
  isFavorite(movie: any): boolean {
    return this.favorites.some(m => m.id === movie.id);
  }
  getCount(): number {
    return this.favorites.length;
  }
}
