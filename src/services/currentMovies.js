import { Subject } from 'rxjs';

/**
 * Current Movies Service
 */
export default class CurrentMoviesService {

  constructor() {
    this.page = 0;
    this.totalPages = 0;
    this.totalResults = 0;

    this._query = '';
    this._movies = [];

    this.$movies = new Subject();
    this.$searchQuery = new Subject();
  }

  /**
   * The current Search query getter
   * @param query
   */
  set searchQuery(query) {
    this._query = query;
    this.$searchQuery.next(query);
  }

  get searchQuery() {
    return this._query;
  }

  /**
   * Movies in the current displayed list
   * @param movies
   */
  set movies(movies) {
    this._movies = movies;
    this.$movies.next(movies);
  }

  get movies() {
    return this._movies;
  }

  /**
   * Hydrate the current movies from a response
   * @param res
   */
  set hydrate(res) {
    this.page = res.page;
    this.totalPages = res.total_pages
    this.totalResults = res.total_results;
    this.movies = res.results;
  }
}