import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { Movie } from "../intercaces/movie";
import { MovieResponse } from "../intercaces/movie-response";
import { map, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class MovieService {

private readonly http=inject(HttpClient);
 private readonly url=environment.url_api;
 private readonly key=environment.api_key;


 public movieList=signal<Movie[]>([]);
 public selectedMovie=signal<Movie|null>(null);
 public wishList=signal<Movie[]>([]);

    constructor() {
        if (typeof localStorage !== 'undefined') {
            const storedWishList = localStorage.getItem('wishList');
            if (storedWishList) {
                try {
                    const movies = JSON.parse(storedWishList);
                    if (Array.isArray(movies)) {
                        this.wishList.set(movies);
                    }
                } catch {
                    localStorage.removeItem('wishList');
                }
            }
        }
    }

    getMovieList():Observable<Movie[]>{
        return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}`)
            .pipe(
                map(response=>response.results)
            )
      
    }
    getMovieById(id:number){
        return this.http.get<Movie>(`${environment.url_movie_api}${id}?api_key=${this.key}`);
    }
    addToWishlist(movie: Movie) {
        if (this.wishList().some(item => item.id === movie.id)) {
            return false;
        }

        this.wishList.update(wishList =>
            [...wishList, movie]
        );
        this.saveWishList();
        return true;
    }

    removeFromWishlist(movieId: number) {
        this.wishList.update(wishList => wishList.filter(movie => movie.id !== movieId));
        this.saveWishList();
    }

    private saveWishList() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('wishList', JSON.stringify(this.wishList()));
        }
    }
}
