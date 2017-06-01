import CurrentMoviesService from './index';
import mockMovies from '../../__tests__/mocks/mock-movies.mock';
import mockSearchResponse from '../../__tests__/mocks/mock-search-response.mock';

let service;

describe('CurrentMoviesService', () => {

  beforeEach(() => {
    service = new CurrentMoviesService();
  });

  describe('Sanity check', () => {

    it('should have an empty query', () => {
      expect(service._query).toBeNull();
    });

    it('should have no movies', () => {
      expect(service._movies).toBeNull();
    });

    it('should have default response settings', () => {
      expect(service.page).toEqual(1);
      expect(service.totalPages).toEqual(0);
      expect(service.totalResults).toEqual(0);
    });

  });

  describe('Hydrate', () => {

    it('should add page results', () => {
      service.hydrate = mockSearchResponse;
      expect(service.page).toEqual(1);
      expect(service.totalPages).toEqual(1);
      expect(service.totalResults).toEqual(mockMovies.length);
    });

    it('should add results', () => {
      service.hydrate = mockSearchResponse;
      expect(service._movies).toEqual(mockMovies);
    });

  });

  describe('Query', () => {

    it('should hear the search query update', () => {
      const searchQuery = 'testing';

      service.$searchQuery.subscribe((resultQuery) => {
        expect(resultQuery).toEqual(searchQuery);
      });

      service.query = searchQuery;
    });

  });

  describe('Movies', () => {

    it('should hear the movies update', () => {
      service.$movies.subscribe((resultMovies) => {
        expect(resultMovies).toEqual(mockMovies);
        expect(resultMovies.length).toEqual(mockMovies.length);
        expect(resultMovies[ 0 ].title).toBeTruthy();
        expect(resultMovies[ 0 ].title).toEqual(mockMovies[ 0 ].title);
      });

      service.movies = mockMovies;
    });
  });
});