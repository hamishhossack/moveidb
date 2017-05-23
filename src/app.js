import Component from './components/component';
import theMovieDb from './services/moviedb/index';
import CurrentMoviesService from './services/current-movies/index';
import SearchComponent from './components/search';
import CurrentListComponent from './components/current-list';
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
    const SearchComp = new SearchComponent({ currentMoviesService: this.currentMoviesService });
    const CurrentListComp = new CurrentListComponent({ currentMoviesService: this.currentMoviesService });

    SearchComp.init();
    CurrentListComp.init();
  }
}