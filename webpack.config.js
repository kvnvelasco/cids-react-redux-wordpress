var webpack = require('webpack'),
    htmlGenerator = require('html-webpack-plugin'),
    copyPlugin = require('copy-webpack-plugin')
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var source = path.join(__dirname, 'src')
var build = path.join(__dirname, 'build')

module.exports = {
  target: 'web',

  entry: {
    app: [
      path.join(source, 'js/app.js')
    ],
    // vendor: [
    //     'react', 'react-dom', 'react-burger-menu', 'radium'
    // ]
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'bower_components',
      source
    ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          plugins: ['babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-class-properties', 'babel-plugin-react-html-attrs'],
          presets: ['stage-2','es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css-loader!sass'})
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css-loader'})
      },
      {
        test: /template\.jade/,
        exclude: /(node_modules|bower_components|)/,
        loader: 'raw!jade-html'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url?limit=25000',
        include: source
      }
    ]

  },

  output: {
    path: build,
    publicPath: '/wp-content/themes/cids/',
    filename: 'js/[name]-[hash].js',
    chunkFilename: 'js/chunks/[name]-[id].js'
  },

  plugins: [
    new CleanWebpackPlugin([path.join(build, '/*')], {'verbose' : true}),

    new htmlGenerator({
      inject: true,
      template: 'jade!src/index.jade',
      filename: 'index.php'
    }),

    new copyPlugin([
      {from: path.join(source, 'functions.php')},
      {from: path.join(source, 'style.css')},
      // Copy Images
      {from: path.join(source, 'img/'), to: 'img/'}
    ]),
    new ExtractTextPlugin({
      filename: "[name].css",
      inject: 'head',
      template: 'jade!src/index.jade'
    }),

    // new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),

    new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')

    }),
  ]
}
