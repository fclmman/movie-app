import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable, take} from 'rxjs';
import {Movie} from '../../model/movie';
import {MovieService} from '../../service/movie.service';
import {Comment} from '../../model/comment';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormsUtil} from '../../util/froms-util';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movie: Observable<Movie>;
  cast: Observable<string[]>;
  comments: Observable<Comment[]>;
  showComments = false;
  form: UntypedFormGroup;

  constructor(private _movies: MovieService) {
    this.movie = this._movies.movieInfo;
    this.cast = this._movies.movieCast;
    this.comments = this._movies.movieComments;
    this.form = new UntypedFormGroup({
      message: new UntypedFormControl('')
    });
  }

  async comment() {
    const movieId = await lastValueFrom(this._movies.currentMovieId.pipe(take(1)));
    FormsUtil.validateAllFormFields(this.form);
    const messageControl = this.form.get('message');
    if (this.form.valid) {
      this._movies
        .postMovieComment(
          movieId,
          messageControl.value
        )
        .subscribe(() => {
          messageControl.setValue('');
        });
    }
  }

  ngOnInit() {
  }
}
