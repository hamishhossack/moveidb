import Component from '../component';
import currentSelectedCompTpl from './movie-selected.hbs';

export default class MovieListComponent extends Component {
  constructor({ selectedMovieService }) {
    super();
    this.selectedMovieService = selectedMovieService;

    this.name = 'movie-selected';
    this.tpl = currentSelectedCompTpl;
    this.context = {
      selectedMovie: this.selectedMovieService.movie
    };
  }

  compInit() {
    this.selectedMovieService.$movie.subscribe((movie) => {
      this.context.selectedMovie = movie;
      this.render(); // TODO (hamish): Shadow dom should improve this
    });
  }

  bindEvents() {
  }
}