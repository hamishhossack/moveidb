import CurrentMoviesService from './index';
import mockMovie from '../../__tests__/mocks/mock-movie.mock';

let service;

describe('MovieSelectedService', () => {

  beforeEach(() => {
    service = new CurrentMoviesService();
  });

  describe('Sanity check', () => {

    it('should have no movie', () => {
      expect(service._movie).toBeNull();
    });

  });

  describe('Select A Movie', () => {

    it('should be able to set a movie', () => {
      service.movie = mockMovie;
      expect(service._movie).toEqual(mockMovie);
    });

    it('should be able to set a movie', () => {
      service.$movie.subscribe((movie) => {
        expect(movie).toEqual(mockMovie);
      });

      service.movie = mockMovie;
    });
  });

});