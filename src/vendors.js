/**
 * Require all vendors for the project
 */

import 'rxjs/Rx';

import Handlebars from 'handlebars';

Handlebars.registerHelper(
  'truncate',
  (str, length = 150) => str.length > length ? `${str.substring(0, length)}...` : str
);
