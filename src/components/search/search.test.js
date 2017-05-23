import SearchComponent from './index';
import searchComponentTpl from './search.hbs';
import CurrentMoviesService from '../../services/currentMovies/index';

let component;
const currentMoviesService = new CurrentMoviesService();

describe('SearchComponent', () => {

  beforeEach(() => {
    component = new SearchComponent({ currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).toEqual('search');
    });

    it('should have a string template', () => {
      expect(component.tpl).toEqual(searchComponentTpl);
    });

  });

  describe('Compilation', () => {

    it('should not compile without valid el', () => {
      component.name = 'this-el-is-broken';
      expect(() => component.el).toThrow(new Error(`No component found for component name "<${component.name}>"`));
    });

    it('should not compile without tpl', () => {
      expect(() => component.render()).toThrow(new Error(`No component found for component name "<${component.name}>"`));
    });

  });

});