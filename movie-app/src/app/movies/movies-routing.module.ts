import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MoviesPage} from './movies.page';
import {MovieIdResolverService} from '../resolver/movie-id-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage,
  },
  {
    path: ':movieId',
    resolve: [MovieIdResolverService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./movie/movie.module').then(m => m.MoviePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {
}
