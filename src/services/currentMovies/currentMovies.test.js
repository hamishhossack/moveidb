import CurrentMoviesService from './index';

let service;

const mockMovies = [
  { id: 1, title: 'Best movie ever' },
  { id: 2, title: 'Worst movie ever' }
];

const mockSearchResponse = {
  page: 0,
  total_pages: 1,
  total_results: 2,
  results: mockMovies
};

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
      expect(service.page).toEqual(0);
      expect(service.totalPages).toEqual(1);
      expect(service.totalResults).toEqual(2);
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
        expect(resultMovies.length).toEqual(2);
        expect(resultMovies[ 0 ].title).toBeTruthy();
        expect(resultMovies[ 0 ].title).toEqual(mockMovies[ 0 ].title);
      });

      service.movies = mockMovies;
    });

  });

});