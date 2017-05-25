import { Subject } from 'rxjs';

export default class SelectedMovieService {

  constructor() {
    this._movie = null;
    this.$movie = new Subject();
  }

  set movie(movie) {
    this._movie = movie;
    this.$movie.next(movie);
  }

  get movie() {
    return this._movie;
  }
}