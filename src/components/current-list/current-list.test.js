import CurrentListComponent from './index';
import CurrentMoviesService from '../../services/current-movies/index';
import currentListComponentTpl from './current-list.hbs';
import mockMovies from '../../__tests__/mocks/mock-movies.mock';

const currentMoviesService = new CurrentMoviesService();

let component;

describe('CurrentListComponent', () => {

  beforeEach(() => {
    component = new CurrentListComponent({ currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).toEqual('current-list');
    });

    it('should have a string template', () => {
      expect(component.tpl).toEqual(currentListComponentTpl);
    });

  });

  describe('Gallery', () => {

    beforeEach(() => {
      const el = document.createElement('current-list');
      document.body.appendChild(el);
    });

    it('should show results in gallery', () => {
      component.context.movies = mockMovies;
      component.render();
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(mockMovies.length);
    });

  });

});
