import MovieSelectedComponent from './index';
import CurrentMoviesService from '../../services/movies-search-list/index';
import SelectedMovieService from '../../services/movie-selected';
import currentListComponentTpl from './movie-selected.hbs';
import mockMovie from '../../__tests__/mocks/mock-movie.mock';

const currentMoviesService = new CurrentMoviesService();
const selectedMovieService = new SelectedMovieService();

let component;

describe('MovieListComponent', () => {

  beforeEach(() => {
    component = new MovieSelectedComponent({ currentMoviesService, selectedMovieService });
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

    xit('should have be hidden', () => {
      component.render();
      const el = document.querySelector('.selected-movie');
      expect(el.classes.includes('hidden')).toBeTruthy();
      expect(el.classes.includes('show')).toBeFalsy();
    });

    xit('should be visible', () => {
      component.context.selectedMovie = mockMovie;
      component.render();
      tick(1);
      expect(el.classes.includes('show')).toBeTruthy();
      expect(el.classes.includes('hidden')).toBeFalsy();
    });

    xit('should show title', () => {
      component.context.selectedMovie = mockMovie;
      component.render();
      tick(1);
      expect(document.querySelector('h2').innerText).toEqual(mockMovie.title);
    });

    xit('should change the item', () => {
      const changedTitle = 'Changed the title';
      component.context.movies = mockMovie;
      component.render();

      component.context.movie.title = changedTitle;
      component.render();

      expect(document.querySelector('h2').innerText).toEqual(changedTitle);
    });
  });
});
