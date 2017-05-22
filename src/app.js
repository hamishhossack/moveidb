import Component from './components/component';
import SearchComponent from './components/search';
import theMovieDb from './services/moviedb';
import CurrentMoviesService from './services/currentMovies';

import appTpl from './app.hbs';

export default class App extends Component {
  constructor() {
    super();
    this.name = 'main';
    this.tpl = appTpl;

    this.currentMoviesService = new CurrentMoviesService();

    theMovieDb.authentication.generateToken(
      (token) => sessionStorage.setItem('token', token),
      console.error
    );
  }

  compInit() {
    this.buildComponents();
  }

  buildComponents() {
    const SearchComp = new SearchComponent({ theMovieDb, currentMoviesService: this.currentMoviesService });
    SearchComp.init();
  }
}