import Component from '../component';
import currentListCompTpl from './current-list.hbs';

export default class CurrentListComponent extends Component {
  constructor({ currentMoviesService }) {
    super();
    this.currentMoviesService = currentMoviesService;

    this.name = 'current-list';
    this.tpl = currentListCompTpl;
    this.context = {
      movies: this.currentMoviesService.movies
    };
  }

  compInit() {
    this.currentMoviesService.$movies.subscribe((movies) => {
      this.context.movies = movies;
      this.render(); // TODO (hamish): Shadow dom should improve this
    });
  }

  onShowNextPage() {
    this.currentMoviesService.nextPage();
  }

  onShowPrevPage() {
    this.currentMoviesService.nextPage();
  }
}