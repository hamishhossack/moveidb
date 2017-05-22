import Component from './components/component';
import theMovieDb from './services/moviedb';

import appTpl from './app.hbs';

export default class App extends Component {
  constructor() {
    super();
    this.name = 'main';
    this.tpl = appTpl;

    theMovieDb.authentication.generateToken(
      (token) => sessionStorage.setItem('token', token),
      console.error
    );
  }
}