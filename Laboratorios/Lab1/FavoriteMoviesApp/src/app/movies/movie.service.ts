import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'api/movies'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessagesService,
    private http: HttpClient
  ){ }

  getMovies (): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
    .pipe(
      tap(_ => this.log('fetched Movies')),
      catchError(this.handleError<Movie[]>('getMovies',[]))
    );
   }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url)
    .pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie,
      this.httpOptions).pipe(
        tap(_ => this.log(`updated movie id=${movie.id}`)),
        catchError(this.handleError<any>('updateMovie'))
    );
  }

  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions)
      .pipe(
        tap((newMovie: Movie) => this.log(`added movie w/ id=${newMovie.id} id=${newMovie.url}`)),
        catchError(this.handleError<Movie>('addMovie'))
      );
  }

  deleteMovie(movie: Movie | number) {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted movie id=${id}`)),
        catchError(this.handleError<Movie>('deleteMovie'))
      );
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found movies matching "${term}"`)),
        catchError(this.handleError<Movie[]>('searchMovies',[]))
      );
  }


  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable
    * result
  */
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user
    // consumption
    this.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
