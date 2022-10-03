import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../model/movie';
import {merge, Observable, ReplaySubject, Subject, tap, withLatestFrom} from 'rxjs';
import {mergeMap, shareReplay} from 'rxjs/operators';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Observable<Movie[]>;
  currentMovieId: Observable<number>;
  movieInfo: Observable<Movie>;
  movieCast: Observable<string[]>;
  movieComments: Observable<Comment[]>;
  private _currentMovieId = new ReplaySubject<number>(1);
  private _commentUpdates = new Subject<Comment[]>();

  constructor(private _http: HttpClient) {
    this.currentMovieId = this._currentMovieId.asObservable();
    this.movies = this.getMovies().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.movieInfo = this.currentMovieId.pipe(
      mergeMap((id) => this.getMovieInfo(id)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
    this.movieCast = this.currentMovieId.pipe(
      mergeMap((id) => this.getMovieCast(id)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
    const initComments = this.currentMovieId.pipe(
      mergeMap((id) => this.getMovieComments(id)),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
    this.movieComments = merge(initComments, this._commentUpdates).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  getMovies() {
    return this._http.get<Movie[]>('Movies');
  }

  getMovieInfo(id: number) {
    return this._http.get<Movie>(`Movies/${id}/Info`);
  }

  getMovieCast(id: number) {
    return this._http.get<string[]>(`Movies/${id}/Cast`);
  }

  getMovieComments(id: number) {
    return this._http.get<Comment[]>(`Movies/${id}/Comments`);

  }

  postMovieComment(id: number, message: string) {
    return this._http.post<Comment>(`Movies/${id}/Comments/Post`, {
      message
    }).pipe(
      withLatestFrom(this.movieComments, this.currentMovieId),
      tap(([newComment, comments, movieId]) => {
        if (newComment.movie_id.toString() === movieId.toString()) {
          this._commentUpdates.next([newComment, ...comments]);
        }
      })
    );
  }

  setMovieId(id: number) {
    this._currentMovieId.next(id);
  }
}
