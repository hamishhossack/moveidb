import Siema from 'siema';
import Component from '../component';
import currentListCompTpl from './movie-list.hbs';

export default class MovieListComponent extends Component {
  constructor({ currentMoviesService, selectedMovieService }) {
    super();
    this.currentMoviesService = currentMoviesService;
    this.selectedMovieService = selectedMovieService;

    this.siema = null;
    this.name = 'movie-list';
    this.tpl = currentListCompTpl;
    this.context = {
      movies: this.currentMoviesService.movies
    };
  }

  compInit() {
    this.currentMoviesService.$movies.subscribe((movies) => {
      this.context.movies = movies;
      this.render(); // TODO (hamish): Shadow dom should improve this
    });
  }

  bindEvents() {
    // initialise carousel
    const $gallery = this.el.querySelector('.gallery');
    if ($gallery) {
      this.initGallery($gallery);

      // listen for a click for each gallery cell
      const $galleryCells = $gallery.querySelectorAll('.gallery-cell');
      $galleryCells.forEach(
        $cell => $cell.addEventListener(
          'click', $event => this.onClickGalleryCell($event.target.dataset.id)
        )
      );
    }
  }

  /**
   * Build a gallery from the element
   * @param gallery
   */
  initGallery(gallery) {
    this.siema = new Siema({
      selector: gallery,
      duration: 200,
      easing: 'ease-out',
      perPage: 5,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: false,
    });
  }

  /**
   * Actionable func to apply to a gallery cell click event
   * @param id
   */
  onClickGalleryCell(id) {
    this.selectedMovieService.movie = this.currentMoviesService.movies
      .filter(movie => movie.id === id);
  }
}