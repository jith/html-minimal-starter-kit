var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ReloadPlugin = require('reload-html-webpack-plugin');
var Pages = require("./webpack.pages.js");

var config = {
  resolve: {
    modules: [
      path.join(__dirname, "./src"),
      "./node_modules"
    ]
  },
  entry:{
    dev: [
      "webpack-dev-server/client?http://localhost:3000/",
      "webpack/hot/dev-server",
    ],
    "global": ["jquery","./src/global.js"]
  },
  output: {
    filename: 'build/[name].bundle.js'
  },
  externals: {
    "jquery": "jQuery"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "global"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ReloadPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true
            }
          },
        ]
      }
    ]
  },
  devtool: 'inline-source-map'
};

Object.keys(Pages.page).map(function(key){
  config.entry[Pages.page[key].name] = Pages.page[key].entry;
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: Pages.page[key].template,
      filename: Pages.page[key].htmlFileName,
      chunks: ["global","dev",Pages.page[key].name],
      inject: true
    })
  );
});

module.exports = config;
