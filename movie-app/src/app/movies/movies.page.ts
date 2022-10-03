import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MovieService} from '../service/movie.service';
import {Observable} from 'rxjs';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private _movies: MovieService) {
    this.movies = this._movies.movies;
  }

  ngOnInit() {
  }
}
