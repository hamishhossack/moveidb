import MovieListComponent from './index';
import CurrentMoviesService from '../../services/movies-search-list/index';
import currentListComponentTpl from './movie-list.hbs';
import mockMovies from '../../__tests__/mocks/mock-movies.mock';

const currentMoviesService = new CurrentMoviesService();

let component;

describe('MovieListComponent', () => {

  beforeEach(() => {
    component = new MovieListComponent({ currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).toEqual('movie-list');
    });

    it('should have a string template', () => {
      expect(component.tpl).toEqual(currentListComponentTpl);
    });

  });

  describe('Gallery', () => {

    beforeEach(() => {
      const el = document.createElement('movie-list');
      document.body.appendChild(el);
    });

    it('should show results in gallery', () => {
      component.context.movies = mockMovies;
      component.render();
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(mockMovies.length);
    });

  });

});
