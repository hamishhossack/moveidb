import { Observable } from 'rxjs';

import Component from '../component';
import searchCompTpl from './search.hbs';

export default class SearchComponent extends Component {
  constructor({ currentMoviesService }) {
    super();
    this.currentMoviesService = currentMoviesService;

    this.name = 'search';
    this.tpl = searchCompTpl;
    this.context = {
      placeholder: 'Search for movies...',
    };
    this.movies = [];
  }

  bindEvents() {
    // Watch the input and apply execute the latest search (wait time for human typing)
    const $input = this.el.querySelector('input');
    const search = Observable.fromEvent($input, 'keyup')
      .pluck('target', 'value')
      .filter(text => text.length > 2)
      .distinctUntilChanged()
      .debounceTime(300);

    // Add our new query to the search service
    search.do(query => this.currentMoviesService.searchQuery = query);
  }
}
