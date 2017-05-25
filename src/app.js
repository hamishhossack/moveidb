import Component from './components/component';
import theMovieDb from './services/moviedb';
import CurrentMoviesService from './services/movies-search-list';
import SelectedMovieService from './services/movie-selected';
import SearchComponent from './components/search';
import MovieListComponent from './components/movie-list';
import MovieSelectedComponent from './components/movie-selected';
import appTpl from './app.hbs';

export default class App extends Component {
  constructor() {
    super();
    this.name = 'main';
    this.tpl = appTpl;

    this.currentMoviesService = new CurrentMoviesService();
    this.selectedMovieService = new SelectedMovieService();

    theMovieDb.authentication.generateToken(
      (token) => sessionStorage.setItem('token', token),
      console.error
    );
  }

  compInit() {
    this.buildComponents();
  }

  buildComponents() {
    const searchComponent = new SearchComponent({
      currentMoviesService: this.currentMoviesService
    });
    const movieListComponent = new MovieListComponent({
      currentMoviesService: this.currentMoviesService,
      selectedMovieService: this.selectedMovieService
    });
    const movieSelectedComponent = new MovieSelectedComponent({
      selectedMovieService: this.selectedMovieService
    });

    searchComponent.init();
    movieListComponent.init();
    movieSelectedComponent.init();
  }
}