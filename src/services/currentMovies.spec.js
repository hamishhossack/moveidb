import { expect } from 'chai';

import CurrentMoviesService from './currentMovies';

let service;

const mockMovies = [
  { id: 1, title: 'Best movie ever' },
  { id: 2, title: 'Worst movie ever' }
];

const mockSearchResponse = {
  page: 0,
  total_pages: 1,
  total_results: 2,
  results: [ mockMovies ]
};

describe('CurrentMoviesService', () => {

  beforeEach(() => {
    service = new CurrentMoviesService();
  });

  describe('Sanity check', () => {

    it('should have an empty query', () => {
      expect(service._query).to.be.empty;
    });

    it('should have no movies', () => {
      expect(service._movies).to.be.empty;
    });

    it('should have no response settings', () => {
      expect(service.page).to.equal(0);
      expect(service.totalPages).to.equal(0);
      expect(service.totalResults).to.equal(0);
    });

  });

  describe('Hydrate', () => {

    it('should add page results', () => {
      service.hydrate = mockSearchResponse;
      expect(service.page).to.equal(0);
      expect(service.totalPages).to.equal(1);
      expect(service.totalResults).to.equal(2);
    });

    it('should add results', () => {
      service.hydrate = mockSearchResponse;
      expect(service._movies).to.equal(mockMovies);
    });

  });

  describe('Query', () => {

    it('should hear the search query update', () => {
      const searchQuery = 'testing';

      service.$searchQuery.subscribe((resultQuery) => {
        expect(resultQuery).to.equal(searchQuery);
      });

      service.query = searchQuery;
    });

  });

  describe('Movies', () => {

    it('should hear the movies update', () => {
      service.$movies.subscribe((resultMovies) => {
        expect(resultMovies).to.equal(mockMovies);
        expect(resultMovies).to.have.length(2);
        expect(resultMovies[ 0 ]).to.have.property('title');
        expect(resultMovies[ 0 ].title).to.equal(mockMovies[ 0 ].title);
      });

      service.movies = mockMovies;
    });

  });

});