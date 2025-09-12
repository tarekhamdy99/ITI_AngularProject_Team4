import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, DecimalPipe, NgClass, FormsModule, RouterLink],
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  totalPages = 1;
  currentPage = 1;
  searchQuery: string = '';
  isSearching: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Load Now Playing
  loadMovies(page: number = 1) {
    this.isSearching = false;
    this.movieService.getNowPlaying(page).subscribe((res: any) => {
      this.setMovies(res);
    });
  }

  // Search Movies
  searchMovies(page: number = 1) {
    const query = this.searchQuery.trim();
    if (!query) {
      this.loadMovies();
      return;
    }

    this.isSearching = true;
    this.movieService.searchMovies(query, page).subscribe((res: any) => {
      this.setMovies(res);
      this.searchQuery = "";
    });
  }

  // Helper to map movies
  private setMovies(res: any) {
    this.movies = res.results.map((m: any) => ({
      ...m,
      // لا حاجة لـ isFavorite هنا، سيتم إدارتها بواسطة الخدمة
    }));
    this.totalPages = res.total_pages;
    this.currentPage = res.page;
  }

  // ✅ New Methods:
  toggleFavorite(movie: any) {
    this.movieService.toggleFavorite(movie);
  }

  isFavorite(movie: any): boolean {
    return this.movieService.isFavorite(movie);
  }

  changePage(page: number | string) {
    if (typeof page !== 'number') return;
    if (page < 1 || page > this.totalPages) return;

    if (this.isSearching) {
      this.searchMovies(page);
    } else {
      this.loadMovies(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStrokeColor(vote: number): string {
    if (vote < 5) return '#dc3545';
    if (vote < 7) return '#ffc107';
    return '#28a745';
  }

  getPages(): Array<number | '...'> {
    const maxPages = 5;
    const pages: Array<number | '...'> = [];

    if (this.totalPages <= maxPages) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
      return pages;
    }

    const start = Math.max(2, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);

    pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < this.totalPages - 1) pages.push('...');
    pages.push(this.totalPages);

    return pages;
  }
}
