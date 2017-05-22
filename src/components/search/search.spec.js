import { expect } from 'chai';

import SearchComponent from './index';
import theMovideDb from '../../services/moviedb'; // TODO (hamish): Mock this further down the line
import searchComponentTpl from './search.hbs';
import CurrentMoviesService from '../../services/currentMovies';

let component
const currentMoviesService = new CurrentMoviesService();

describe('SearchComponent', () => {

  beforeEach(() => {
    component = new SearchComponent({ theMovieDb, currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).to.equal('search');
    });

    it('should have a string template', () => {
      expect(component.tpl).to.equal(searchComponentTpl);
    });

  });

  describe('Compilation', () => {

    it('should not compile without tpl', () => {
      expect(component.compile).to.throw(Error);
    });

    it('should not render without tpl', () => {
      expect(component.render()).to.throw(Error);
    });

  });

});