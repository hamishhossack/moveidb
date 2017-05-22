import { Observable } from 'rxjs';

import Component from '../component';
import searchCompTpl from './search.hbs';

export default class SearchComponent extends Component {
  constructor({ theMovieDb, currentMoviesService }) {
    super();
    this.theMovieDb = theMovieDb;
    this.currentMoviesService = currentMoviesService;

    this.name = 'search';
    this.tpl = searchCompTpl;
    this.context = {
      placeholder: 'Search for movies...',
    };
    this.movies = [];
  }

  /**
   * Bind to the movie DB service and query for the movie
   * TODO (hamish): Remove promise when theMovieDb service is observable
   * @param query
   * @returns {Promise}
   */
  searchMovies(query) {
    return new Promise((resolve, reject) =>
      this.theMovieDb.search.getMovie(
        { query },
        res => resolve(JSON.parse(res)),
        reject
      )
    );
  }

  bindEvents() {
    // Watch the input and apply execute the latest search (wait time for human typing)
    const $input = this.el.querySelector('input');
    const search = Observable.fromEvent($input, 'keyup')
      .pluck('target', 'value')
      .filter(text => text.length > 2)
      .distinctUntilChanged()
      .debounceTime(300)
      .do(query => this.currentSearch = query)
      .switchMap(query => this.searchMovies(query));

    // update the app movie service with the new movies
    search.subscribe((res) => {
        this.currentMoviesService.hydrate = res;
        this.currentMoviesService.searchQuery = this.currentSearch;
      },
      console.error
    );
  }
}
