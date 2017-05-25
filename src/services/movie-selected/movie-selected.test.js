import CurrentMoviesService from './index';

let service;

describe('MovieSelectedService', () => {

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

});