import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule, DecimalPipe } from '@angular/common'; // ✅ Add DecimalPipe
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, DecimalPipe], // ✅ Add DecimalPipe
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  favorites: any[] = []
  constructor(private _movie: MovieService) {
    this.favorites = this._movie.favorites;
  }
  // ✅ New Methods:
  getStrokeColor(vote: number): string {
    if (vote < 5) return '#dc3545';
    if (vote < 7) return '#ffc107';
    return '#28a745';
  }

  isFavorite(movie: any): boolean {
    return this._movie.isFavorite(movie);
  }

  toggleFavorite(movie: any): void {
    this._movie.toggleFavorite(movie);
  }


}
