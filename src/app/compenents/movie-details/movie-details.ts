import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../intercaces/movie';

@Component({
  imports: [NgIf],
  selector: 'app-movie-detail',
templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetail implements OnInit {

  private router: Router = inject<Router>(Router)
  private route: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute)
   movieService: MovieService = inject<MovieService>(MovieService)
  confirmationMessage = '';

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieById(id)
      })).subscribe(movie => this.movieService.selectedMovie.set(movie))
  }
  backToMovieList() {
    this.router.navigate(['/']);
  }
  addToWish(movie:Movie) {
    const added = this.movieService.addToWishlist(movie);
    this.confirmationMessage = added
      ? `"${movie.title}" added to wishlist`
      : `"${movie.title}" is already in your wishlist`;
  }
}