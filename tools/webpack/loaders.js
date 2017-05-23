/**
 * Loaders for webpack
 *
 */

const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CssLoader = () => {
  return {
    test: /\.css$/,
    use: [ 'to-string-loader', 'css-loader' ],
    exclude: [ helpers.root('src', 'styles') ]
  };
};

const SassLoader = () => {
  return {
    test: /\.s?css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    })
  }
};

const JsonLoader = () => {
  return {
    test: /\.json$/,
    use: 'json-loader'
  };
};


const HtmlLoader = () => {
  return {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [ helpers.root('src/index.html') ]
  };
};

const FileLoader = () => {
  return {
    test: /\.(jpg|png|gif)$/,
    use: 'file-loader'
  };
};

const SourceMapLoader = () => {
  return {
    enforce: 'pre',
    test: /\.js$/,
    use: 'source-map-loader',
  };
};

const HandlebarsLoader = () => {
  return {
    test: /\.hbs/,
    loader: 'handlebars-loader'
  };
};

const JavascriptLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [ 'es2015', 'stage-0' ],
        plugins: [ 'transform-es2015-modules-commonjs', 'transform-runtime' ]
      }
    }
  }
};

const InstanbulLoader = () => {
  return {
    test: /\.js$/,
    include: helpers.root('src'),
    loader: 'istanbul-instrumenter-loader',
    query: {
      esModules: true
    }
  };
}

module.exports = {
  CssLoader,
  SassLoader,
  JsonLoader,
  HtmlLoader,
  FileLoader,
  SourceMapLoader,
  HandlebarsLoader,
  JavascriptLoader,
  InstanbulLoader,
};
