import MovieListComponent from './index';
import CurrentMoviesService from '../../services/movies-search-list';
import SelectedMovieService from '../../services/movie-selected';
import currentListComponentTpl from './movie-list.hbs';
import mockMovies from '../../__tests__/mocks/mock-movies.mock';

const currentMoviesService = new CurrentMoviesService();
const selectedMovieService = new SelectedMovieService();

let component;

describe('MovieListComponent', () => {

  beforeEach(() => {
    component = new MovieListComponent({ currentMoviesService, selectedMovieService });
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

    // TODO(hamish) : Testing PhantomJS querySelector Functionality
    xit('should have be empty', () => {
      component.render();
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(0);
    });

    xit('should show results', () => {
      component.context.movies = mockMovies;
      component.render();
      tick(1);
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(mockMovies.length);
    });

    xit('should click and add a selected item', () => {
      component.context.movies = mockMovies;
      component.render();

      const cell = document.querySelector('.gallery-cell');
      cell.click();

      expect(selectedMovieService.movie).toEqual(mockMovies[ 0 ]);
    });
  });
});
