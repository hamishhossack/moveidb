import App from './app';
/**
 * Import the app styles for webpack
 */
import './scss/main.scss';

const AppComponent = new App();

window.onload = () => {
  console.debug(`Loading App`);
  AppComponent.init();
};
