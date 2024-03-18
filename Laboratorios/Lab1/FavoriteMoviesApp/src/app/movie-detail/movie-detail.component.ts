import { Component, Input } from '@angular/core';
import { Movie } from '../movies/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {


  @Input() movie?: Movie;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

   getMovie(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
    }
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    if (this.movie) {
      this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
    }
  }

}
