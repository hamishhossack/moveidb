const path = require('path');
const webpackMerge = require('webpack-merge');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = require('./common');
const helpers = require('./../helpers');
const loaders = require('./loaders.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const METADATA = webpackMerge(commonConfig({ env: ENV }).METADATA, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  API_URL: process.env.API || `http://localhost:3001`,
});

module.exports = function (options) {

  return {

    devtool: 'cheap-module-source-map',

    resolve: {
      extensions: [ '.js' ],
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ],
      alias: {
        handlebars: 'handlebars/dist/handlebars.js'
      },
    },

    module: {
      rules: [
        loaders.JsonLoader(),
        loaders.SourceMapLoader(),
        loaders.CssLoader(),
        loaders.SassLoader(),
        loaders.FileLoader(),
        loaders.HandlebarsLoader(),
        loaders.JavascriptLoader(),
      ]
    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
        }
      }),

      new LoaderOptionsPlugin({
        debug: false,
        options: {
          // legacy options go here
        }
      }),

    ],

    performance: {
      hints: false
    },

    target: 'node',
    externals: [ nodeExternals() ],

  };
}
