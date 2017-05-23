import Siema from 'siema';
import Component from '../component';
import currentListCompTpl from './current-list.hbs';

export default class CurrentListComponent extends Component {
  constructor({ currentMoviesService }) {
    super();
    this.currentMoviesService = currentMoviesService;

    this.siema = null;
    this.name = 'current-list';
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
}