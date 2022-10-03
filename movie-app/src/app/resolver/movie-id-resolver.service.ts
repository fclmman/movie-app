import {Injectable} from '@angular/core';
import {MovieService} from '../service/movie.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieIdResolverService implements Resolve<number> {
  constructor(private _movies: MovieService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): number | Observable<number> {
    const movie = route.paramMap.get('movieId');
    const movieId = movie != null ? parseInt(movie, 10) : null;
    this._movies.setMovieId(movieId);
    return movieId;
  }
}
