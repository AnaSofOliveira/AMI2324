import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './movies';
import { MovieService } from './movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})

export class MoviesComponent implements OnInit{

  movies!: Movie[];

  constructor(private movieService: MovieService) {
    this.movieService = movieService;
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);

  }

  ngOnInit(): void {
    this.getMovies();
  }

  add(name: string, url: string): void {
    name = name.trim();
    url = url.trim();
    if (!name || !url) { return; }
    this.movieService.addMovie({ name, url } as Movie)
    .subscribe(movie => {
    this.movies.push(movie);
    });
  }

  delete(movie: Movie) {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
