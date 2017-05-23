import CurrentListComponent from './index';
import CurrentMoviesService from '../../services/currentMovies/index';
import currentListComponentTpl from './current-list.hbs';

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

});
