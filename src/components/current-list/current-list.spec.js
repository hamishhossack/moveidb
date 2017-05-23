import { expect } from 'chai';

import CurrentListComponent from './index';
import CurrentMoviesService from '../../services/currentMovies';
import currentListComponentTpl from './current-list.hbs';

const currentMoviesService = new CurrentMoviesService();

let component;

describe('CurrentListComponent', () => {

  beforeEach(() => {
    component = new CurrentListComponent({ currentMoviesService });
  });

  describe('Sanity check', () => {

    it('should have a name search', () => {
      expect(component.name).to.equal('current-list');
    });

    it('should have a string template', () => {
      expect(component.tpl).to.equal(currentListComponentTpl);
    });

  });

});
