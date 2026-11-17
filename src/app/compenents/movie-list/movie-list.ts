import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';


@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  router = inject(Router);
  movieService = inject(MovieService);

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe(response => {
      this.movieService.movieList.set(response);
    });
  }

  navigateTo(movie: { id: number }) {
    this.router.navigate(['/', movie.id]);
  }
}