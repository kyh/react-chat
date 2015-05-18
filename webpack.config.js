 const webpack = require('webpack');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const path = require('path');

 const scssLoaders = [
   'css-loader',
   'autoprefixer-loader?browsers=last 2 version',
   'sass-loader?outputStyle=compressed'
 ];
 
 const config = {
   context: __dirname,
   entry: {
     app: ['webpack/hot/dev-server', './client/app/app.js']
   },
   module: {
    noParse: [],
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", scssLoaders.join("!")) },
      { test: /\.(woff|png)$/, loader: 'url-loader?limit=100000'}
    ]
   },
   output: {
     publicPath: '/',
     path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
     filename: 'bundle.js'
   },
   plugins: [
     new ExtractTextPlugin('styles/style.css'),
     new webpack.NoErrorsPlugin(),
     new webpack.optimize.CommonsChunkPlugin('app', null, false)
   ]
 };

 module.exports = config;
