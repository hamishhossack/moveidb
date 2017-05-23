import { Subject } from 'rxjs';

import theMovieDb from '../moviedb/index';

/**
 * Current Movies Service
 */
export default class CurrentMoviesService {

  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.totalResults = 0;

    this._query = null;
    this._movies = null;

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
    this.search();
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

  /**
   * Find the next page of results
   */
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.search();
    }
  }

  /**
   * Find the next page of results
   */
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.search();
    }
  }

  /**
   * Search the movie db for results
   */
  search() {
    theMovieDb.search.getMovie(
      {
        query: this.searchQuery,
        page: this.page
      },
      res => this.hydrate = JSON.parse(res),
      console.error
    );
  }
}