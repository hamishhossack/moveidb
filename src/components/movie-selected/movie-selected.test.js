import MovieSelectedComponent from './index';
import CurrentMoviesService from '../../services/movies-search-list/index';
import currentListComponentTpl from './movie-selected.hbs';
import mockMovies from '../../__tests__/mocks/mock-movies.mock';

const currentMoviesService = new CurrentMoviesService();

let component;

describe('MovieListComponent', () => {

  beforeEach(() => {
    component = new MovieSelectedComponent({ currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).toEqual('movie-selected');
    });

    it('should have a string template', () => {
      expect(component.tpl).toEqual(currentListComponentTpl);
    });

  });

  describe('Selected', () => {



  });

});
