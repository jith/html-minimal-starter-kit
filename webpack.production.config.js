var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var Pages = require("./webpack.pages.js");

var config = {
  resolve: {
    modules: [
      path.join(__dirname, "./src"),
      "./node_modules"
    ]
  },
  entry: {
    "global": ["jquery","./src/global.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'build/[name].bundle.js',
    publicPath: './'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "global",
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: "build/[name].styles.css"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?minimize=true"
        })
      }
    ]
  }
};

Object.keys(Pages.page).map(function(key){
  config.entry[Pages.page[key].name] = Pages.page[key].entry;
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: Pages.page[key].template,
      filename: Pages.page[key].htmlFileName,
      chunks: ["global",Pages.page[key].name],
      inject: true,
      minify: {
        collapseWhitespace: false
      }
    })
  );
});

module.exports = config;
